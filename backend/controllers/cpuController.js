const si = require('systeminformation'); 
async function getSystemInfo() {
    try {
        const systemDiskModule = await import('system-disk');
        const diskPath = await systemDiskModule.default();
        const cpuLoad = await si.currentLoad();
        const diskInfo = await si.fsSize();
        const systemDiskInfo = diskInfo.find(disk => {
            return disk.mount === diskPath || disk.device === diskPath;
        });
        if (!systemDiskInfo) {
            throw new Error(`Không tìm thấy thông tin ổ đĩa hệ thống cho diskPath: ${diskPath}`);
        }
        const memoryInfo = await si.mem();
        const heapMemory = {
            total: process.memoryUsage().heapTotal / 1e6, 
            used: process.memoryUsage().heapUsed / 1e6
        };
        return {
            cpuLoad: `${Math.round(cpuLoad.currentLoad)}%`,
            diskPath,
            disk: {
                total: `${Math.round(systemDiskInfo.size / 1e9)} GB`, 
                used: `${Math.round(systemDiskInfo.used / 1e9)} GB`,  
                available: `${Math.round((systemDiskInfo.size - systemDiskInfo.used) / 1e9)} GB`, 
                usage: `${Math.round(systemDiskInfo.use)}%` 
            },
            memory: {
                total: `${Math.round(memoryInfo.total / 1e9)} GB`, 
                used: `${Math.round((memoryInfo.total - memoryInfo.available) / 1e9)} GB`, 
                available: `${Math.round(memoryInfo.available / 1e9)} GB`, 
                usage: `${Math.round(memoryInfo.active / memoryInfo.total * 100)}%` 
            },
            jvmHeap: {
                total: `${Math.round(heapMemory.total)} MB`, 
                used: `${Math.round(heapMemory.used)} MB`, 
                usage: `${Math.round(heapMemory.used / heapMemory.total * 100)}%` 
            }
        };
    } catch (error) {
        console.error('Lỗi khi lấy thông tin hệ thống:', error.message);
        throw error;
    }
}
exports.getSystemDiskInfo = async (req, res) => {
    try {
        const systemInfo = await getSystemInfo();
        res.json(systemInfo);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Không thể lấy thông tin hệ thống.' });
    }
};
