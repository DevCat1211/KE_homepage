document.addEventListener("DOMContentLoaded", function() {
    // .content의 모든 직접 자식 요소를 선택
    const animatedItems = document.querySelectorAll('.content > *');

    const observerOptions = {
        threshold: 0.1  // 10% 이상 보이면 트리거
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if(entry.isIntersecting) {
            // 뷰포트에 들어오면 .animate 클래스를 추가하여 애니메이션 실행
            entry.target.classList.add('animate');
            // 한 번 애니메이션이 실행되면 관찰 해제
            observer.unobserve(entry.target);
        }
        });
    }, observerOptions);

    animatedItems.forEach(item => {
        observer.observe(item);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // 트랙과 카드들 선택
    const track = document.getElementById('current-track');
    const cards = track.querySelectorAll('.current-card');
    let activeIndex = 0; // 가운데 카드(두번째)를 기본 활성화

    // 카드 전체 너비 계산 (60vw + 7vw*2)
    const CARD_TOTAL_WIDTH = 72; // 단위: vw

    // 트랙 이동 및 활성 카드 갱신 함수
    function updateCarousel() {
        // 각 카드의 중앙 위치: 좌측 여백 7vw + (카드 너비의 절반 30vw) + (인덱스 * 74vw)
        // 화면 중앙은 50vw이므로, 필요한 offset = 50 - (7+30+activeIndex*74) = 50 - (37 + activeIndex*74)
        const offset = 50 - (36 + activeIndex * CARD_TOTAL_WIDTH);
        track.style.transform = `translateX(${offset}vw)`;

        // 카드 활성 클래스 업데이트
        cards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('card-active');
            } else {
                card.classList.remove('card-active');
            }
        });
    }

    // 좌측 버튼 클릭 이벤트
    document.querySelector('#current .current-left').addEventListener('click', function() {
        if (activeIndex > 0) {
            activeIndex--;
            updateCarousel();
        }
    });

    // 우측 버튼 클릭 이벤트
    document.querySelector('#current .current-right').addEventListener('click', function() {
    if (activeIndex < cards.length - 1) {
        activeIndex++;
        updateCarousel();
    }
    });

    setInterval(() => {
        activeIndex = (activeIndex + 1)%cards.length;
        updateCarousel();
    }, 7000);

    // 초기 상태 업데이트
    updateCarousel();
});