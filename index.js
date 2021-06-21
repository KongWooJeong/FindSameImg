const img = document.querySelectorAll('.child'), // 이미지(그림) div 태그
    startBtn = document.querySelector('.startBtn'), // 게임 시작 버튼 태그
    imgBox = document.querySelector('.box'); // 이미지를 모두 포함하는 div 태그

const IMAGES = ['image-1', 'image-2', 'image-3', 'image-4']; // 이미지 파일 이름을 배열로 저장

let prevselectImg, // 두개의 이미지를 비교하기위해 첫번째로 선택된 이미지의 정보를 담는다.
    chkNum = 0; // 이미지를 맞출때마다 count를 하여 저장
    randImgNum = new Array(8); // 해당 이미지를 랜덤으로 생성한 이미지를 저장하는 배열 생성


console.log(randImgNum[0]);

/* 각 이미지를 랜덤하게 위치시키기 위해 각 이미지를 배열의 저장한다. */
function randomImg() {
    let chk = 0; // 같은 이미지를 2개만 넣기 위해 count를 한다.

    /* 이미지 갯수만큼 반복문을 돌린다. */
    for(let i = 0; i < IMAGES.length; i++) {
        chk = 0; // 변수 i가 바뀔때마다(이미지가 바뀔때) chk 초기화

        /* 이미지를 두개만 저장하기 위해 */
        while(chk < 2) {
            randNum = Math.floor(Math.random() * 8); // 배열의 인덱스를 랜덤하게 생성하기 위해

            /* 해당 배열(randImgNyum)에 값이 비었을때만 해당 인덱스에 이미지 할당 */
            if(randImgNum[randNum] === undefined) {
                randImgNum[randNum] = IMAGES[i]; // 이미지 할당
                chk++; // count를 센다.
            }
        } 
    }
}

/* 랜덤하게 생성된 이미지를 화면에 출력 */
function loadImgae() {
    for(let i = 0; i < img.length; i++) {
        img[i].style.backgroundImage = `url('images/${randImgNum[i]}.png')`; // 이미지를 화면에 출력
        img[i].dataset.value = randImgNum[i]; // data 속성을 사용하여 나중에 두개 이미지를 비교할때 사용
    }
}

/* 해당 이미지를 안보이게하기위해 색상을 추가한다. */
function loadColor() {
    for(let i = 0; i < img.length; i++) {
        img[i].style.backgroundImage = ''; // 이미지 제거
        img[i].classList.add('backColor'); // 색상 추가(css 클래스를 이용함)
    }
}

/* 두개의 이미지를 비교할때 */
function chkCurrentImg(e, selImg) {

    /* 첫번째로 선택한 이미지와 두번째로 선택한 이미지를 비교 */
    if(e.getAttribute('data-value') !== selImg.getAttribute('data-value')) {

        // 두개의 이미지가 같지 않을때 다시 이미지 화면 출력 안보이게
        setTimeout(function() {
            selImg.style.backgroundImage = ""; // 첫번째 선택된 이미지 화면 출력 안보이게
            e.style.backgroundImage = ""; // 두번째 선택된 이미지 화면 출력 안보이게
        
    }, 500)
    } else{
        
        // 두개의 이미지가 같을때
        e.classList.add('noClick'); // 두번째로 선택된 이미지를 다시 클릭 안되게 하기 위해(css 클래스 이용)
        selImg.classList.add('noClick'); // 첫번째로 선택된 이미지를 다시 클릭 안되게 하기 위해(css 클래스 이용)
        chkNum++; // 같은 이미지를 맞출때 count 증가
    }

}

/* 게임시작 버튼 클릭시 이벤트 함수 */
function handleImgClick(event) {
    let selImg = prevselectImg; // 첫번때로 선택한 이미지를 변수에 저장

    let imageUrl = event.target.getAttribute('data-value'); // 클릭한 이미지의 data 속성을 가져와 이미지 이름을 변수에 할당

    event.target.style.backgroundImage = `url('images/${imageUrl}.png')`; // 클릭한 이미지를 화면에 출력

    /* 첫번째로 선택한 이미지가 있을경우 두개의 이미지 비교 */
    /* 없을경우엔 선택한 이미지를 변수 prevselectImg 할당 */
    if(selImg !== undefined) {
        chkCurrentImg(event.target, selImg); // 두개의 이미지 비교
        prevselectImg = undefined; // 첫번째로 선택한 이미지 초기화
    } else {
        prevselectImg = event.target; // 첫번째로 선택한 이미지 변수에 할당.
    }

    chkAllCurrentImage(); // 모든 이미지를 맞춘것을 체크하기위한 함수 호출
}

/* 이미지를 모두 맞춘경우를 체크하기위하 */
function chkAllCurrentImage() {
    if(chkNum === 4) {

        // 이미지를 맞출때마다 count를 세어 해당 count가 4이면 모두 맞춘걸로 인식
        resetGame(); 
    }
}

/* 게임시작 버튼 클릭시 이벤트 함수 */
function handleStartBtnClick(e) {
    imgBox.classList.remove('display'); // 해당 이미지 div 태그를 활성화(css 클래스를 이용함)
    if(e.target.innerText === '재시작') {
        resetGame(); // 재시작 버튼 클릭시 게임 리셋 
    } else {
        e.target.innerText = '재시작'; // 게임시작버튼을 누르면 재시작으로 변환
        randomImg(); // 랜덤한 위치에 이미지 배열 생성
        loadImgae(); // 이미지를 화면에 출력
        setTimeout(loadColor , 1000); // 사용자가 이미지를 확인할 수 있는 시간을 주기위해 setTimeout 사용
    }
}

/* 게임 리셋 */
function resetGame() {
    chkNum = 0; // 이미지를 맞출때 체크하는 변수 초기화

    /* 모든 div(이미지) 태그 초기화 */
    for(let i = 0; i < img.length; i++) {
        img[i].classList.remove('backColor'); // 색상 초기화 (css 클래스 이용) 
        img[i].classList.remove('noClick'); // 클릭 안되게하는 기능 초기화 (css 클래스 이용) 
        img[i].dataset.value = ''; // 이미지 data 속성 초기화
        img[i].style.backgroundImage = ''; // 이미지 초기화
        prevselectImg = undefined; // 첫번째로 선택된 이미지 초기화
        randImgNum.splice(0, randImgNum.length); // 램던하게 생성된 이미지 배열 초기화
    }

    /* 게임 시작을 위한 해당 값들 재할당 */
    randomImg();
    loadImgae();
    setTimeout(loadColor , 1000);
}

function init() {
    startBtn.addEventListener('click', handleStartBtnClick); // 게임시작 버튼 클릭시 이벤트 함수
    
    /* 각 이미지를 클릭시 이벤트 함수 */
    for(let i = 0; i < img.length; i++) {
        img[i].addEventListener('click', handleImgClick);
    }
}

init();

