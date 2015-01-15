#include "object.jsx"
#include "string.jsx"
#include "array.jsx"
#include "object.conversions.jsx"
#include "error.jsx"
#include "file.jsx"
#include "date.jsx"
#include "math.jsx"
#include "dom.application.jsx"
if (!app.is("toolkit")) {
	#include "dom.suite.jsx"
}
if (app.is("indesign")) {
	#include "dom.indesign.jsx"
}

#include "rf_dom.jsx"
#include "rf_math.jsx"
#include "rf_regexp.jsx"
#include "rf_array.jsx"
#include "rf_text_frame.jsx"
#include "rf_object.jsx"