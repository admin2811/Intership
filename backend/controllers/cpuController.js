const os = require('os');

function calculateCpuLoad() {
    const cpus = os.cpus();
    let idle = 0;   
    let total = 0;

    // Tính toán tổng thời gian CPU và thời gian nhàn rỗi cho mỗi lõi
    cpus.forEach(core => {
        for (let type in core.times) {
            total += core.times[type];
        }
        idle += core.times.idle;
    });

    // Kiểm tra nếu tổng là 0 để tránh chia cho 0
    if (total === 0) return { load1: 0, load5: 0, load15: 0 };

    // Tính phần trăm thời gian sử dụng CPU
    const load = 1 - idle / total;

    // Trả về giá trị dưới dạng số (number), không phải chuỗi
    return {
        load1: load * 100, // Trả về số thay vì chuỗi
        load5: load * 100, // Trả về số thay vì chuỗi
        load15: load * 100, // Trả về số thay vì chuỗi
    };
}
// Controller để trả về CPU Load
exports.getCpuLoad = (req, res) => {
    const cpuLoad = calculateCpuLoad();
    res.json(cpuLoad);
};
