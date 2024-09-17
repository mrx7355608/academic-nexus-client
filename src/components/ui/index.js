import SubjectTagWithoutColorMode from "./SubjectTag";
import ParaWithoutColorMode from "./Para";
import withColorMode from "./withColorMode";

const SubjectTag = withColorMode(SubjectTagWithoutColorMode);
const Para = withColorMode(ParaWithoutColorMode);

export { SubjectTag, Para };
