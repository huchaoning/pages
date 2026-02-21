export function initThreeBody(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // --- 1. 随机生成初始条件的辅助函数 ---
    function getRandomParams() {
        const colors = ['#60a5fa', '#a855f7', '#34d399', '#facc15', '#fb7185']; // 备选颜色库
        const bodies = [];
        
        for (let i = 0; i < 3; i++) {
            bodies.push({
                // 位置：在屏幕 20% 到 80% 的范围内随机，避免一出生就撞墙
                x: width * (0.2 + Math.random() * 0.6),
                y: height * (0.2 + Math.random() * 0.6),
                // 速度：-2 到 2 之间的随机浮点数
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                // 随机选择颜色
                color: colors[Math.floor(Math.random() * colors.length)],
                // 随机大小 3 到 6
                size: 3 + Math.random() * 3
            });
        }
        return bodies;
    }

    let bodies = getRandomParams();

    function animate() {
        // 拖尾效果：背景遮盖
        ctx.fillStyle = 'rgba(2, 6, 23, 0.15)'; 
        ctx.fillRect(0, 0, width, height);

        bodies.forEach(body => {
            // 更新位置
            body.x += body.vx;
            body.y += body.vy;

            // 边界反弹逻辑
            if (body.x - body.size < 0 || body.x + body.size > width) body.vx *= -1;
            if (body.y - body.size < 0 || body.y + body.size > height) body.vy *= -1;

            // 绘制发光效果
            ctx.save();
            ctx.globalCompositeOperation = 'lighter'; 
            
            // 外层光晕
            ctx.beginPath();
            ctx.arc(body.x, body.y, body.size, 0, Math.PI * 2);
            ctx.fillStyle = body.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = body.color;
            ctx.fill();
            
            // 核心白光（增加亮度感）
            ctx.beginPath();
            ctx.arc(body.x, body.y, body.size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.restore();
        });

        requestAnimationFrame(animate);
    }
    
    animate();
}