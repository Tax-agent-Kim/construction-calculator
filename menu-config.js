/**
 * 김용래세무사사무소 기업진단센터 - 공통 메뉴 설정
 * 이 파일만 수정하면 모든 페이지의 햄버거 메뉴가 자동으로 업데이트됩니다.
 */

const MENU_CONFIG = {
    // 로고 설정
    logo: {
        image: 'https://kyrtax.co.kr/gold.png',
        text: '김용래세무사사무소 기업진단센터',
        homeUrl: 'index.html'
    },
    
    // 메뉴 항목 (순서대로 표시됨)
    menuItems: [
        {
            icon: '🏠',
            text: '홈',
            url: 'index.html',
            id: 'home'
        },
        {
            icon: '📋',
            text: '건설업 등록 가이드',
            url: 'criteria.html',
            id: 'criteria'
        },
        {
            icon: '🏥',
            text: '건설업 기업진단 가이드',
            url: 'diagnosis-guide.html',
            id: 'diagnosis'
        },
        {
            icon: '🧮',
            text: '건설업 실질자본 간이계산기',
            url: 'calculator.html',
            id: 'calculator'
        },
        {
            icon: '📊',
            text: '건설업체 기업진단지침',
            url: 'regulations.html',
            id: 'regulations'
        },
        {
            icon: '💬',
            text: 'Q&A 게시판',
            url: 'qna.html',
            id: 'qna'
        },
        {
            icon: '📰',
            text: '기업진단센터 블로그',
            url: 'https://blog.naver.com/kyr_tax',
            id: 'blog',
            target: '_blank'
        }
    ]
};

/**
 * 햄버거 메뉴 HTML 생성 함수
 * @param {string} currentPageId - 현재 페이지의 ID (active 표시용)
 */
function renderHamburgerMenu(currentPageId) {
    const headerHTML = `
    <!-- 햄버거 메뉴 -->
    <div class="hamburger-container">
        <div class="hamburger-header">
            <a href="${MENU_CONFIG.logo.homeUrl}" class="hamburger-logo">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${MENU_CONFIG.logo.image}" alt="${MENU_CONFIG.logo.text}" style="width: 32px; height: 32px; flex-shrink: 0;">
                    <div style="font-size: 18px; font-weight: 700; color: #333; line-height: 1.3; word-break: keep-all;">
                        ${MENU_CONFIG.logo.text}
                    </div>
                </div>
            </a>
            <button class="hamburger-button" id="hamburgerBtn" aria-label="메뉴">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </div>
    </div>

    <!-- 햄버거 오버레이 -->
    <div class="menu-overlay" id="hamburgerOverlay"></div>

    <!-- 햄버거 메뉴 패널 -->
    <nav class="hamburger-menu" id="hamburgerMenu">
        <button class="hamburger-close-btn" id="hamburgerClose" aria-label="메뉴 닫기">✕</button>
        <div class="hamburger-menu-content">
            ${MENU_CONFIG.menuItems.map(item => `
            <a href="${item.url}" 
               class="hamburger-menu-item ${item.id === currentPageId ? 'active' : ''}"
               ${item.target ? `target="${item.target}" rel="noopener noreferrer"` : ''}>
                <span class="hamburger-menu-icon">${item.icon}</span>${item.text}
            </a>
            `).join('')}
        </div>
    </nav>
    `;
    
    // body 시작 부분에 삽입
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // 이벤트 리스너 설정
    initHamburgerMenu();
}

/**
 * 햄버거 메뉴 이벤트 리스너 초기화
 */
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const hamburgerClose = document.getElementById('hamburgerClose');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const hamburgerOverlay = document.getElementById('hamburgerOverlay');

    function toggleMenu(e) {
        if (e) e.stopPropagation();
        hamburgerBtn.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        hamburgerOverlay.classList.toggle('active');
        document.body.style.overflow = hamburgerMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu(e) {
        if (e) e.stopPropagation();
        hamburgerBtn.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        hamburgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    hamburgerClose.addEventListener('click', closeMenu);
    hamburgerOverlay.addEventListener('click', closeMenu);

    // 메뉴 항목 클릭 시 메뉴 닫기 (모바일)
    document.querySelectorAll('.hamburger-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}
