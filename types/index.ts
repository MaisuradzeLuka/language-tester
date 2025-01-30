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

export interface ISelectInputs {
  type: "select";
  question: string;
  options: { name: string; value: string; customId: string }[];
  correctOption: string;
}

export interface ITextInputs {
  type: "text";
  question: string;
  text: string;
  options: { name: string; value: string; customId: string }[];
  correctOption: string;
}

export interface IFormInputs {
  title: string;
  questions: (ISelectInputs | ITextInputs)[];
}

export interface ITest {
  _id: string;
  questions: [
    {
      question: string;
      options: { name: string; value: string; id: string };
      correctOption: string;
      _id: string;
    },
  ];
  author: string;
  authorId: string;
  title: string;
  __v: number;
}
