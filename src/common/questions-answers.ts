interface IQuestionsAndAnswer {
  /**
   * The question.
   */
  q: string;
  /**
   * The answer.
   */
  a: string;
}
export const questionsAndAnswers: IQuestionsAndAnswer[] = [
  {
    "q": `What happened to the old version of the Set-Analysis-Wizard?`,
    "a": `Oh, that's a long story. Bottom line the "old" version was developed many, many years ago, using technologies for which I could not find a web-hosting company anymore. As this solution is just a contribution to the Qlik community, I did not want to pay a lot of money for some web-hoster. That's why I decided to just re-write it using more moder technologies, open source it and make it accessible via GitHub.`
  },
  {
    "q": `I looked at the code, do you know that it is crap?`,
    "a": `Yes, I do. I wrote this application many, many years ago as a quick and dirty prototype for Qlik customers. I never thought it would survive so many years and become so popular. But as this is not a commercial offering, I cannot afford to entirely re-write it. BTW: I am happy to receive pull-requests if you want to clean up things and make the overall code + app nicer ;-)`
  },
  {
    "q": `Can I use this app for commercial Qlik projects?`,
    "a": `Yes, sure, that's the idea. Use it for commercial project, I hope it helps. You are just not allowed to take the source code and build a commercial offering on top of it.`
  },
  {
    "q": `Do you save any sensitive data such as expressions, fields I use?`,
    "a": `No, not at all. If data is stored, this only happens in the context of your local web-browser to provide some convenience functions.`
  },
  {
    "q": `Is this an official offering, supported by Qlik?`,
    "a": `No, not at all. Although I worked ten years for Qlik, I built and published this solution as a private project before I joined Qlik.`
  },
  {
    "q": `My expression doesn't work. Can you help me?`,
    "a": `No, unfortunately not. If you want to get help with expressions, I recommend to ask in the Qlik Community. Although, if you feel that you've found a bug in the Set-Analysis-Wizard, please feel free to post an issue in the GitHub repository (https://github.com/stefanwalther/set-analysis-wizard)`
  },
  {
    "q": `I have some ideas how to improve the app. Can I contribute?`,
    "a": `Oh, sure, that's the idea behind every Open Source project. I'd love to review your pull-request.`
  },
  {
    "q": `How can I run the app locally (eg when traveling)?`,
    "a": `I am planing to provide a quite easy solution to run this app locally, stay tuned.`
  },
  {
    "q": `Can I buy you a coffee (to say thanks)?`,
    "a": `Thank you. That's a nice move. As I am a strong supporter and believer of the Open Source community I kindly ask you to donate these few bucks to any Open Source projects of your choice, because that's what I would do with the money you'd send me!`
  },
  {
   "q": `Can you recommend any good resources to learn more about Set Analysis?`,
   "a": `Yes, sure. Go to the "Help" section, where I have listed some good resources.`
  },
  {
    "q": `Why do you track usage-data with Google Analytics?`,
    "a": `Very simple, I am interested if my efforts pay off and how many users are still using this tool ... ;-)`
  }
]
