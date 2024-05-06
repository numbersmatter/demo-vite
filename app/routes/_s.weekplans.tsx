import SectionHeaderDescription from "~/components/shell/section-headers";


const sectionText = {
  header: "Weekly Plans",
  description: "Weekly plans guide staff through all of the tasks that need to be completed each week in order to implement the program."
}


export default function WeekPlan() {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <SectionHeaderDescription
        header={sectionText.header}
        description={sectionText.description}
      />
    </div>
  );
}