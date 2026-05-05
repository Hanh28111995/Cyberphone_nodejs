import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

puppeteer.use(StealthPlugin());

const BRANDS = [
  { name: 'iphone', url: 'https://www.gsmarena.com/apple-phones-48.php' },
  { name: 'Samsung', url: 'https://www.gsmarena.com/samsung-phones-9.php' },
  { name: 'Xiaomi', url: 'https://www.gsmarena.com/xiaomi-phones-80.php' },
  { name: 'OPPO', url: 'https://www.gsmarena.com/oppo-phones-82.php' },
];



async function scrapePhoneDetails(browser, url, type) {
  const page = await browser.newPage();
  try {
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1'
    });
    
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const html = await page.content();
    const $ = cheerio.load(html);

    const name = $('h1.specs-phone-name-title').text().trim();
    if (!name) return null;

    let price = $('[data-spec="price"]').text().trim();
    if (!price) price = 'Liên hệ';

    const screenSize = $('span[data-spec="displaysize-hl"]').text().trim();
    const screenRes = $('div[data-spec="displayres-hl"]').text().trim();
    const screen = `${screenSize} - ${screenRes}`;

    const backCamera = $('span[data-spec="camerapixels-hl"]').text().trim() || $('[data-spec="cam1modules"]').text().trim();
    const frontCamera = $('span[data-spec="videopixels-hl"]').text().trim() || $('[data-spec="cam2modules"]').text().trim();

    const img = $('.specs-photo-main a img').attr('src');
    
    const os = $('[data-spec="os"]').text().trim();
    const chipset = $('[data-spec="chipset"]').text().trim();
    const ram = $('span[data-spec="ramsize-hl"]').text().trim();
    const desc = `OS: ${os}, Chipset: ${chipset}, RAM: ${ram}`;

    // Lấy toàn bộ các bảng thông số kỹ thuật (Full Specifications)
    const allSpecs = {};
    $('#specs-list table').each((i, table) => {
      const category = $(table).find('th').text().trim();
      if (category) {
        allSpecs[category] = {};
        $(table).find('tr').each((j, tr) => {
          let key = $(tr).find('.ttl a').text().trim();
          if (!key) key = $(tr).find('.ttl').text().trim();
          
          const val = $(tr).find('.nfo').text().trim();
          
          if (key && val) {
            allSpecs[category][key] = val;
          } else if (val && !key) {
            // Trường hợp một dòng thông số dài bị rớt xuống dòng tiếp theo
            allSpecs[category][`_extra_${j}`] = val;
          }
        });
      }
    });

    return {
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      New: 'true',
      fullSpecs: allSpecs // Đã thêm toàn bộ thông số kỹ thuật
    };
  } catch (error) {
    console.log(`Lỗi khi cào dữ liệu điện thoại: ${url}`, error.message);
    return null;
  } finally {
    await page.close();
  }
}

async function startCrawler() {
  console.log('Khởi động trình duyệt...');
  const browser = await puppeteer.launch({
    headless: false, // Mở trình duyệt để bạn có thể tự click qua Captcha
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,800'
    ]
  });

  const allPhones = [];

  for (const brand of BRANDS) {
    console.log(`\nĐang cào dữ liệu hãng: ${brand.name}...`);
    const page = await browser.newPage();
    
    try {
      // Fake User Agent xịn hơn
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1'
      });
      
      // Che dấu Puppeteer
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
        Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
        Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
      });

      console.log(`Đang tải trang: ${brand.url}`);
      await page.goto(brand.url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      
      // Dừng lại 15 giây để bạn CÓ THỂ CLICK VƯỢT QUA CAPTCHA CLOUDFLARE BẰNG TAY (nếu có)
      console.log(`[!] Vui lòng kiểm tra cửa sổ Chrome. Nếu có Captcha Cloudflare, hãy tự click "Verify you are human" ngay bây giờ... (Chờ 10 giây)`);
      await new Promise(r => setTimeout(r, 10000));
      
      // Chờ cho danh sách điện thoại (thẻ ul có class makers) xuất hiện
      try {
        await page.waitForSelector('.makers ul li a', { timeout: 10000 });
      } catch (e) {
        console.log(`[Cảnh báo] Không tìm thấy danh sách cho ${brand.name}. Có thể bị block Cloudflare. Bỏ qua hãng này.`);
        continue;
      }
      
      const html = await page.content();
      const $ = cheerio.load(html);
      
      const phoneLinks = [];
      $('.makers ul li a').each((i, el) => {
        if (i < 5) { // Lấy 5 điện thoại mới nhất của mỗi hãng để test nhanh, bạn có thể tăng lên
          phoneLinks.push(`https://www.gsmarena.com/${$(el).attr('href')}`);
        }
      });

      console.log(`Tìm thấy ${phoneLinks.length} điện thoại. Bắt đầu lấy chi tiết...`);
      
      for (const link of phoneLinks) {
        console.log(`Đang đọc: ${link}`);
        const phoneData = await scrapePhoneDetails(browser, link, brand.name);
        
        if (phoneData) {
          allPhones.push(phoneData);
          console.log(`[+] Đã lấy thành công: ${phoneData.name}`);
        }
        // Nghỉ 2 giây để tránh bị block
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (error) {
      console.log(`Lỗi khi cào danh sách ${brand.name}:`, error.message);
    } finally {
      await page.close();
    }
  }

  // Lưu ra file JSON
  const outputPath = path.join(__dirname, 'phone_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(allPhones, null, 2), 'utf-8');
  console.log(`\nHoàn tất! Đã lưu ${allPhones.length} điện thoại vào file: ${outputPath}`);

  await browser.close();
  process.exit(0);
}

startCrawler();