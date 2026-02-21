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

    // 初始参数 (赋予小球不同的质量，尽管现在还没用到物理逻辑)
    let bodies = [
        { x: width * 0.5, y: height * 0.3, vx: 1.2, vy: 0.2, color: '#60a5fa', size: 4 }, // 蓝色
        { x: width * 0.4, y: height * 0.6, vx: -0.8, vy: 0.8, color: '#a855f7', size: 5 }, // 紫色
        { x: width * 0.6, y: height * 0.6, vx: -0.6, vy: -1.2, color: '#34d399', size: 3 }  // 绿色
    ];

    function animate() {
        // --- 1. 拖尾的关键：这里不使用 clearRect ---
        // 这一步是核心，它像是在旧画面上蒙了一层极其透明的黑纱，让旧轨迹慢慢变淡
        ctx.fillStyle = 'rgba(2, 6, 23, 0.15)'; // 这个色值对应 slate-950，透明度决定尾巴长短
        ctx.fillRect(0, 0, width, height);

        bodies.forEach(body => {
            // 更新位置
            body.x += body.vx;
            body.y += body.vy;

            // 边界反弹
            if (body.x < 0 || body.x > width) body.vx *= -1;
            if (body.y < 0 || body.y > height) body.vy *= -1;

            // --- 2. 绘制发光效果 ---
            ctx.save();
            
            // 开启光晕叠加模式
            ctx.globalCompositeOperation = 'lighter'; 
            
            // 绘制核心亮度
            ctx.beginPath();
            ctx.arc(body.x, body.y, body.size, 0, Math.PI * 2);
            ctx.fillStyle = body.color;
            
            // 设置外发光
            ctx.shadowBlur = 20; // 模糊半径
            ctx.shadowColor = body.color; // 亮光的颜色
            
            ctx.fill();
            
            // 再画一个更亮的内心，增加真实感
            ctx.beginPath();
            ctx.arc(body.x, body.y, body.size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; // 内核设为白色，模拟强光
            ctx.fill();

            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    console.log("三体视觉系统已升级：发光与尾迹开启！");
    animate();
}