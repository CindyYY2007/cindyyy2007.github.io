// ==========================================
// 自动隐藏文章数为0的分类/标签（防止404报错）
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取所有分类/标签卡片链接
    var categoryCards = document.querySelectorAll('.category-card, .nexmoe-tag, a[href*="/categories/"], a[href*="/tags/"]');
    
    // 2. 遍历所有卡片
    categoryCards.forEach(function(card) {
        var href = card.getAttribute('href');
        
        // 3. 检查链接是否指向分类或标签页面
        if (href && (href.includes('/categories/') || href.includes('/tags/'))) {
            
            // 4. 发起请求检查页面是否存在
            fetch(href, { method: 'HEAD' })
                .then(function(response) {
                    // 如果返回404，说明该分类/标签下没有文章
                    if (response.status === 404) {
                        // 隐藏这个卡片/链接
                        card.style.display = 'none';
                        
                        // 或者隐藏包含这个链接的整个父元素
                        var parent = card.closest('.nexmoe-card, .category-card, .tag-cloud');
                        if (parent) {
                            parent.style.display = 'none';
                        }
                    }
                })
                .catch(function(error) {
                    // 如果请求失败（比如跨域），也隐藏
                    console.log('隐藏无法访问的分类/标签:', href);
                    card.style.display = 'none';
                });
        }
    });
});