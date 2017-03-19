import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    ":global label": {
        "display": "inline-block",
        "fontWeight": "bold",
        "marginBottom": 5,
        "maxWidth": "100%"
    },
    ":global gte_button": {
        "border": "1px solid #999",
        "borderRadius": 2,
        "boxShadow": "1px 1px 3px #ccc",
        "color": "#000 !important",
        "cursor": "pointer",
        "display": "inline-block",
        "fontSize": 0.88,
        "marginRight": 3,
        "paddingTop": 5,
        "paddingRight": 8,
        "paddingBottom": 5,
        "paddingLeft": 8,
        "position": "relative",
        "float": "left",
        "background": "linear-gradient(top, #ffffff 0%,#f9f9f9 89%,#fafafa 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#fafafa',GradientType=0 )"
    },
    ":global gte_button:hover:not(gte_btn_disabled)": {
        "border": "1px solid #666",
        "boxShadow": "1px 1px 1px #999",
        "background": "linear-gradient(top, #f3f3f3 0%,#e2e2e2 89%,#f4f4f4 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3f3f3', endColorstr='#f4f4f4',GradientType=0 )"
    },
    ":global gte_buttons_container": {
        "float": "left",
        "marginTop": 0,
        "marginRight": 5,
        "marginBottom": 0,
        "marginLeft": 0
    },
    ":global gte_btn_disabled": {
        "background": "#fff",
        "boxShadow": "1px 1px 1px #999",
        "border": "1px solid #eee",
        "cursor": "default",
        "color": "#999 !important"
    },
    ":global gte_editor_popup": {
        "height": "100%",
        "left": "50%",
        "marginLeft": -390,
        "position": "fixed",
        "top": -20,
        "width": 780,
        "zIndex": 111,
        "opacity": 0
    },
    ":global gte_popup_background": {
        "visibility": "hidden",
        "background": "rgba(0, 0, 0, 0) radial-gradient(ellipse farthest-corner at center center , rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%) repeat scroll 0 0",
        "height": "100%",
        "left": 0,
        "position": "fixed",
        "top": 0,
        "width": "100%",
        "zIndex": 110
    },
    ":global gte_popup_container": {
        "display": "table",
        "height": "100%",
        "width": "100%",
        "marginTop": "15%"
    },
    ":global gte_form_body": {
        "paddingTop": 50,
        "paddingRight": 0,
        "paddingBottom": 50,
        "paddingLeft": 0
    },
    ":global gte_form_body_content": {
        "overflow": "auto",
        "position": "relative"
    },
    ":global gte_popup_container_wrapper": {
        "display": "table",
        "height": "100%",
        "verticalAlign": "middle",
        "width": "100%"
    },
    ":global gte_form_border_box": {
        "border": "7px solid rgba(220, 220, 220, 0.5)",
        "borderRadius": 10,
        "boxShadow": "2px 2px 10px #555",
        "boxSizing": "border-box",
        "position": "relative"
    },
    ":global gte_form_fields": {
        "background": "white none repeat scroll 0 0",
        "border": "2px solid #444",
        "borderRadius": 6,
        "boxShadow": "0 0 5px #555",
        "boxSizing": "border-box"
    },
    ":global gte_editor_fields": {
        "border": "1px solid transparent",
        "clear": "both",
        "paddingTop": 5,
        "paddingRight": "20%",
        "paddingBottom": 5,
        "paddingLeft": "20%",
        "position": "relative"
    },
    ":global gte_form_content": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "position": "relative"
    },
    ":global gte_header": {
        "backgroundColor": "#f3f3f3",
        "borderBottom": "1px solid #ddd",
        "boxSizing": "border-box",
        "fontSize": 1.3,
        "height": 50,
        "paddingTop": 16,
        "paddingRight": 10,
        "paddingBottom": 2,
        "paddingLeft": 16,
        "position": "absolute",
        "borderTopLeftRadius": 5,
        "borderTopRightRadius": 5,
        "left": 2,
        "right": 2,
        "top": 2,
        "width": "auto"
    },
    ":global gte_footer": {
        "backgroundColor": "#f3f3f3",
        "borderTop": "1px solid #ddd",
        "boxSizing": "border-box",
        "height": 50,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "position": "absolute",
        "borderBottomLeftRadius": 5,
        "borderBottomRightRadius": 5,
        "bottom": 2,
        "left": 2,
        "right": 2,
        "width": "auto"
    },
    ":global gte_form_err": {
        "color": "#b11f1f",
        "display": "none",
        "float": "left",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    ":global gte_form_buttons btn": {
        "position": "relative",
        "textAlign": "center",
        "display": "block",
        "marginTop": 0,
        "paddingTop": 5,
        "paddingRight": 15,
        "paddingBottom": 5,
        "paddingLeft": 15,
        "cursor": "pointer",
        "float": "right",
        "fontSize": 14,
        "textShadow": "0 1px 0 white",
        "border": "1px solid #999",
        "WebkitBorderRadius": 4,
        "MozBorderRadius": 4,
        "MsBorderRadius": 4,
        "OBorderRadius": 4,
        "borderRadius": 4,
        "WebkitBoxShadow": "1px 1px 3px #cccccc",
        "MozBoxShadow": "1px 1px 3px #cccccc",
        "boxShadow": "1px 1px 3px #cccccc",
        "backgroundColor": "#f9f9f9 100%",
        "backgroundImage": "linear-gradient(top, white 0%, #eeeeee 65%, #f9f9f9 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='white', EndColorStr='#f9f9f9')"
    },
    ":global gte_form_buttons btn:hover": {
        "backgroundColor": "#f3f3f3 100%",
        "backgroundImage": "linear-gradient(top, white 0%, #dedede 65%, #f3f3f3 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='white', EndColorStr='#f3f3f3')",
        "border": "1px solid #666",
        "boxShadow": "1px 1px 3px #888"
    },
    ":global gte_label": {
        "float": "left",
        "paddingTop": 6,
        "width": "40%"
    },
    ":global gte_label_text": {
        "fontWeight": "normal"
    },
    "divgte_field input[type=\"color\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"date\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"datetime\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"datetime-local\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"email\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"month\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"number\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"password\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"search\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"tel\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"text\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"time\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"url\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field input[type=\"week\"]": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical"
    },
    "divgte_field textarea": {
        "paddingTop": 6,
        "paddingRight": 4,
        "paddingBottom": 6,
        "paddingLeft": 4,
        "width": "100%",
        "resize": "vertical",
        "backgroundColor": "white",
        "boxSizing": "border-box",
        "transition": "background-color 0.15s ease-in-out 0s",
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "KhtmlBorderRadius": 3,
        "borderRadius": 3
    },
    "divgte_field input": {
        "backgroundColor": "white",
        "boxSizing": "border-box",
        "transition": "background-color 0.15s ease-in-out 0s",
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "KhtmlBorderRadius": 3,
        "borderRadius": 3
    },
    ":global gte_field": {
        "float": "right",
        "width": "60%"
    },
    "gte_field input:focus": {
        "backgroundColor": "#ffe !important",
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "KhtmlBorderRadius": 3,
        "borderRadius": 3
    },
    "textarea:focus": {
        "backgroundColor": "#ffe !important",
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "KhtmlBorderRadius": 3,
        "borderRadius": 3
    },
    ":global gte_msg": {
        "paddingTop": 4,
        "paddingRight": 6,
        "paddingBottom": 4,
        "paddingLeft": 6,
        "textAlign": "center"
    },
    ":global fade_in": {
        "visibility": "visible",
        "opacity": 1,
        "transition": "opacity 0.3s linear"
    },
    ":global fade_out": {
        "visibility": "hidden",
        "opacity": 0,
        "transition": "visibility 0s 0.3s, opacity 0.3s linear"
    }
});