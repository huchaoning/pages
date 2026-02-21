export function initScrollEffects() {
    const nav = document.getElementById('sticky-nav');
    const heroCard = document.getElementById('hero-card');
    const indicator = document.getElementById('scroll-indicator');

    if (!heroCard) return;

    // 1. 入场动画：页面加载后移除初始的隐藏类
    // 使用 requestAnimationFrame 确保在浏览器下一帧渲染时执行，动画最流畅
    requestAnimationFrame(() => {
        heroCard.classList.remove('opacity-0', 'scale-95', 'blur-xl');
    });

    // 2. 滚动处理
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const screenHeight = window.innerHeight;
        
        // 当滚动超过屏幕高度的 20% 时触发切换
        if (scrollY > screenHeight * 0.2) {
            // 显示导航栏
            if (nav) {
                nav.classList.remove('opacity-0', '-translate-y-full', 'pointer-events-none');
                nav.classList.add('opacity-100', 'translate-y-0');
            }
            // 虚化并缩小背景卡片
            heroCard.classList.add('opacity-0', 'scale-90', 'blur-lg');
            if (indicator) indicator.classList.add('opacity-0');
        } else {
            // 还原到顶部状态
            if (nav) {
                nav.classList.add('opacity-0', '-translate-y-full', 'pointer-events-none');
                nav.classList.remove('opacity-100', 'translate-y-0');
            }
            // 还原卡片入场后的正常状态
            heroCard.classList.remove('opacity-0', 'scale-90', 'blur-lg');
            if (indicator) indicator.classList.remove('opacity-0');
        }
    }, { passive: true }); // 使用 passive 提升滚动性能
}