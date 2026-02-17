import Card from "./Cards/Card.jsx";
import Container from "@/components/wraper/Container";

const GeneralQuiz = () => {
  return (
    <Container withYPadding={false} className="my-6 md:my-12 lg:my-14">
      <div>
        <Card />
      </div>
    </Container>
  );
};

export default GeneralQuiz;
