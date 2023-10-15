const qnaList = [
    {
        q: '식물을 놓을 곳에 빛이 얼마나 비춥니까? ',
        a: [
            { answer: '빛이 들지 않습니다', 'answerLight':6, type: [] },
            { answer: '1~2시간 정도 빛이 듭니다', 'answerLight':16, type: [] },
            { answer: '3~6시간 정도 빛이 듭니다', 'answerLight':25, type: [] },
            { answer: '항상 빛이 잘 듭니다', 'answerLight':35, type: [] },
        ]
    },
    {
        q: '물을 얼마나 자주 줄 수 있으십니까? ',
        a: [
            { answer: '일주일에 1~2번 줄 수 있습니다', 'answerWater' : 6, type: [] },
            { answer: '일주일에 3~4번 줄 수 있습니다','answerWater' : 16, type: [] },
            { answer: '일주일에 5번 이상 줄 수 있습니다','answerWater' : 25, type: [] },
            { answer: '매일 줄 수 있습니다', 'answerWater' : 37, type : [] }
        ]
    },
    {
        q: '집의 평균 기온은 어느 정도입니까?',
        a: [
            { answer: '11~20도 입니다', 'answerTemperature' : 15, type: [] },
            { answer: '21~27도 입니다', 'answerTemperature' : 25, type: [] },
            { answer: '27~35도 입니다', 'answerTemperature' : 35, type: [] }
        ]
    },
    {
        q: '평소 식물을 키워본 경험이 있으십니까?',
        a: [
            { answer: '아직 식물을 키워본 경험이 없습니다', 'answerLevel' : 8, type: [] },
            { answer: '식물을 키워보진 않았지만, 식물에 관심이 있습니다', 'answerLevel' : 21, type: [] },
            { answer: '식물을 키워본 경험이 있습니다', 'answerLevel' : 34, type: [] },
        ]
    },
    {
        q: '사시는 곳은 어디입니까?',
        a: [
            { answer: '반지하에 거주합니다', 'answerTemperature' : -6, 'answerLight':-7, type: [] },
            { answer: '7층 이하의 주거지에 거주합니다',  'answerTemperature' : 1, 'answerLight':2, type: [] },
            { answer: '8층 이상의 주거지 거주합니다',  'answerTemperature' : -2, 'answerLight': 6, type: [] },
        ]
    },
    {
        q: '일주일에 며칠 정도 외부 약속이 있습니까?',
        a: [
            { answer: '0~2일 정도 있습니다', 'answerWater' : 8, 'answerLevel' : 8, type: [] },
            { answer: '3~4일 정도 있습니다', 'answerWater' : -2.5, 'answerLevel' : -2.5, type: [] },
            { answer: '5일 이상 있습니다', 'answerWater' : -9, 'answerLevel' : -9, type: [] },
        ]
    },
    {
        q: '식물을 어느 장소에서 키울 예정입니까?',
        a: [
            { answer: '빛이 잘 드는 베란다에서 키울 예정입니다', 'answerTemperature' : -1.5, 'answerLight': 4.5, type: [] },
            { answer: '빛이 잘 안드는 베란다에서 키울 예정입니다', 'answerTemperature' : -3, 'answerLight': -3.5, type: [] },
            { answer: '빛이 잘 드는 실내에서 키울 예정입니다', 'answerTemperature' : 2, 'answerLight': 4, type: [] },
            { answer: '빛이 잘 안드는 실내에서 키울 예정입니다', 'answerTemperature' : -4, 'answerLight': -5, type: [] },
        ]
    },
    {
        q: '사는 지역은 어디입니까?',
        a: [
            { answer: '북부 지역입니다', 'answerTemperature' : -2, type: [] },
            { answer: '중부 지역입니다', 'answerTemperature' : 0, type: [] },
            { answer: '남부 지역입니다', 'answerTemperature' : 2, type: [] },
        ]
    },
    {
        q: '저녁은 일주일에 몇 번 정도 집에서 먹습니까?',
        a: [
            { answer: '0~2일 먹습니다', 'answerWater' : -3.5, 'answerLevel' : -3, type: [] },
            { answer: '3~4일 먹습니다', 'answerWater' : 0, 'answerLevel' : 0, type: [] },
            { answer: '5일 이상 먹습니다', 'answerWater' : 3.5, 'answerLevel' : 3, type: [] },
        ]
    },
    {
        q: '평소에 집이 건조하다고 느낍니까?',
        a: [
            { answer: '네, 건조합니다', 'answerWater' : -3.5, 'answerLevel' : -3, type: [] },
            { answer: '아니요, 보통입니다', 'answerWater' : 0, 'answerLevel' : 0, type: [] },
            { answer: '아니요, 습합니다', 'answerWater' : 3.5, 'answerLevel' : 3, type: [] },
        ]
    },
]

export default qnaList;    