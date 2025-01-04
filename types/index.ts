export interface IQuestion {
  nthQuestion: string;
  options: { id: number; nthOption: string; option: string }[];
  question: string;
  correctId: number;
}

export interface IUserData {
  name: string;
  lastname: string;
  ans: number[];
}

export interface IFormInputs {
  title: string;
  questions: {
    question: string;
    option1: { name: string; value: string; id: string };
    option2: { name: string; value: string; id: string };
    option3: { name: string; value: string; id: string };
    correctOption: string;
  }[];
}

export interface ITest {
  _id: string;
  questions: [
    {
      question: string;
      option1: string;
      option2: string;
      option3: string;
      correctOption: string;
      _id: string;
    },
  ];
  author: string;
  authorId: string;
  title: string;
  __v: number;
}
