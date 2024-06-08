function generateQuiz() {
    const inputCategory = document.getElementById('inputCategory').value;
    const outputQuiz = document.getElementById('outputQuiz');
    const shareLink = document.getElementById('shareLink');
  
    // API 요청을 위한 데이터 설정
    const data = {
      messages: [
        {
          role: 'system',
          content: '- 시스템에 입력된 정보를 바탕으로 퀴즈를 생성합니다.\n- 시스템은 퀴즈를 생성할 때, 연인 사이에서 대화 주제가 될 수 있는 퀴즈, 연인의 생각에 대해 알아볼 수 있는 퀴즈를 생성합니다.\n- 사용자가 퀴즈에 대한 카테고리들을 입력하면 아래의 예시 질문 중 같은 카테고리에 있는 질문들을 창의적으로 재 조합하여 퀴즈를 생성합니다.\n- 답변에서는 카테고리와 퀴즈를 생성하고, 어떤 퀴즈가 어떤 카테고리인지 함께 생성합니다.\n- 예를 들면, 나는 연인보다 이건 더 잘한다고 생각하는 것이 있으신가요?(재미)와 같이 생성합니다.\n- 퀴즈 개수는 10개로 생성합니다.'
        },
        {
          role: 'user',
          content: inputCategory
        }
      ],
      temperature: 1,
      repetitionPenalty: 10,
      maxTokens: 300,
      topP: 1
    };

    // API 요청
    fetch('https://cors-anywhere.herokuapp.com/https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY': '1IzboF2LvYV6qaFv6qSwx1Yy1VU4xmPQb0VaNRZV',
        'x-requested-with': 'XMLHttpRequest'  // 이 헤더를 추가
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      // API 응답 결과 처리
      const quizOutput = result.choices[0].message.content;
      outputQuiz.innerHTML = '<div class="question">' + quizOutput.replace(/\n/g, '<br>') + '</div>';
      
      // 공유 링크 생성
      const shareUrl = 'https://example.com/quiz?category=' + encodeURIComponent(inputCategory);
      shareLink.href = shareUrl;
      shareLink.style.display = 'inline-block';
    })
    .catch(error => {
      console.error('API 요청 에러:', error);
      outputQuiz.innerHTML = '<div class="question">퀴즈 생성 중 오류가 발생했습니다. 다시 시도해 주세요.</div>';
    });
  }
  