import fs from 'fs';
import path from 'path';
import os from 'os';

const chromeCachePath = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome', 'win64-147.0.7727.57');

if (fs.existsSync(chromeCachePath)) {
    console.log(`Đang xóa thư mục lỗi: ${chromeCachePath}`);
    fs.rmSync(chromeCachePath, { recursive: true, force: true });
    console.log('Đã xóa thành công thư mục cache bị lỗi!');
} else {
    console.log('Không tìm thấy thư mục bị lỗi, tiến hành cài đặt ngay.');
}
