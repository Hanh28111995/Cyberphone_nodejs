import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, 'phone_data.json');

const toSlug = (str) => {
    return str.toLowerCase()
              .normalize('NFD') 
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
};

try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const detailedData = data.map(phone => {
        phone.slug = toSlug(phone.name);
        
        // Tạo bảng thông số kỹ thuật (Full Specifications) giả lập cực kỳ chi tiết
        phone.fullSpecs = {
            "Mạng (Network)": {
                "Công nghệ": "GSM / HSPA / LTE / 5G",
                "Băng tần 2G": "GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2",
                "Băng tần 3G": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
                "Băng tần 4G": "1, 2, 3, 4, 5, 7, 8, 12, 17, 20, 26, 28, 32, 38, 40, 41, 66",
                "Băng tần 5G": "1, 3, 5, 7, 8, 20, 28, 38, 40, 41, 66, 77, 78 SA/NSA",
                "Tốc độ": "HSPA, LTE-A (Up to 7CA), 5G"
            },
            "Thân máy (Body)": {
                "Kích thước": "160.7 x 77.6 x 7.9 mm",
                "Trọng lượng": "240 g",
                "Chất liệu": "Mặt kính (Gorilla Glass), viền kim loại/Titanium",
                "SIM": "Nano-SIM và eSIM",
                "Kháng nước/bụi": "IP68 (độ sâu 6m trong 30 phút)"
            },
            "Màn hình (Display)": {
                "Loại màn hình": "OLED, 120Hz, HDR10+, Dolby Vision",
                "Kích thước": phone.screen.split(' - ')[0] || "6.7 inches",
                "Độ phân giải": phone.screen.split(' - ')[1] || "1290 x 2796 pixels",
                "Bảo vệ": "Kính cường lực Ceramic Shield glass"
            },
            "Nền tảng (Platform)": {
                "Hệ điều hành (OS)": phone.desc.split(',')[0].replace('OS: ', '').trim(),
                "Chipset (SoC)": phone.desc.split(',')[1].replace('Chipset: ', '').trim(),
                "CPU": "Octa-core (1x3.3 GHz Cortex-X4 & 3x3.2 GHz Cortex-A720 & 2x3.0 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)",
                "GPU": "Adreno 750"
            },
            "Bộ nhớ (Memory)": {
                "Khe cắm thẻ nhớ": "Không",
                "Bộ nhớ trong": "256GB " + phone.desc.split(',')[2].replace('RAM: ', '').trim() + " RAM",
                "Chuẩn bộ nhớ": "UFS 4.0 / NVMe"
            },
            "Camera sau (Main Camera)": {
                "Cụm camera": phone.backCamera,
                "Tính năng": "Dual-LED dual-tone flash, HDR (photo/panorama)",
                "Quay video": "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10-bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode (4K@24/30fps), 3D (spatial) video, stereo sound rec."
            },
            "Camera trước (Selfie Camera)": {
                "Cụm camera": phone.frontCamera,
                "Tính năng": "HDR, Cinematic mode",
                "Quay video": "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS"
            },
            "Âm thanh (Sound)": {
                "Loa ngoài": "Có, với loa stereo",
                "Jack 3.5mm": "Không"
            },
            "Kết nối (Comms)": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct",
                "Bluetooth": "5.3, A2DP, LE",
                "Định vị": "GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS, NavIC",
                "NFC": "Có",
                "USB": "USB Type-C 3.2 Gen 2, DisplayPort 1.2"
            },
            "Pin (Battery)": {
                "Loại pin": "Li-Ion 5000 mAh, không thể tháo rời",
                "Sạc": "Sạc nhanh 45W, sạc không dây 15W (MagSafe/Qi2), sạc ngược có dây 4.5W"
            }
        };
        return phone;
    });

    fs.writeFileSync(jsonPath, JSON.stringify(detailedData, null, 2), 'utf8');
    console.log('Đã cập nhật file phone_data.json thành công với Slug và Full Specs!');
} catch (e) {
    console.error('Lỗi:', e);
}