import SubjectTagWithoutColorMode from "./SubjectTag";
import ParaWithoutColorMode from "./Para";
import PageHeadingWithoutMode from "./PageHeading";
import withColorMode from "./withColorMode";

const SubjectTag = withColorMode(SubjectTagWithoutColorMode);
const Para = withColorMode(ParaWithoutColorMode);
const PageHeading = withColorMode(PageHeadingWithoutMode);

export { SubjectTag, Para, PageHeading };
