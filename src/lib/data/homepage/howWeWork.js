import fetchHomeContent from "./homeContent";

export default async function howWeWorkAround() {
  const content = await fetchHomeContent();
  const firstStep = content.howWeWorkSteps[0] || {};
  const secondStep = content.howWeWorkSteps[1] || {};
  const thirdStep = content.howWeWorkSteps[2] || {};

  return {
    data: {
      howWeWork: {
        heading: content.headingHowWeWork,
        one: firstStep.stepNumber,
        oneIcon: {
          url: firstStep.howWeWorkIcon,
        },
        description: firstStep.stepDescription,
        lineOne: {
          url: content.lineOne,
        },
        two: secondStep.stepNumber,
        twoIcon: {
          url: secondStep.howWeWorkIcon,
        },
        titletwo: secondStep.stepTitle,
        descriptiontwo: secondStep.stepDescription,
        lineTwo: {
          url: content.lineTwo,
        },
        three: thirdStep.stepNumber,
        threeIcon: {
          url: thirdStep.howWeWorkIcon,
        },
        threeTitle: thirdStep.stepTitle,
        threeDescription: thirdStep.stepDescription,
      },
    },
  };
}
