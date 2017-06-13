import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "gt_container": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "font": "normal 14px Tahoma",
        "minWidth": 650
    },
    "tablegigatable": {
        "borderSpacing": 0,
        "font": "normal 12px Tahoma",
        "borderCollapse": "collapse",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "tableLayout": "fixed",
        "minWidth": 550
    },
    "tbody": {
        "color": "#333"
    },
    "tbody tr": {
        "cursor": "default",
        "borderCollapse": "collapse",
        "borderTop": "1px solid #ddd"
    },
    ":global tbody tractive": {
        "backgroundColor": "#25adf1 !important"
    },
    ":global active": {
        "backgroundColor": "#25adf1 !important"
    },
    ":global tbody tractive:hover": {
        "backgroundColor": "#1098dc !important"
    },
    "tbody treven": {
        "backgroundColor": "#fff"
    },
    "tbody trodd": {
        "backgroundColor": "#f9f9f9"
    },
    ":global even": {
        "backgroundColor": "#fff"
    },
    ":global odd": {
        "backgroundColor": "#f9f9f9"
    },
    "td": {
        "wordWrap": "break-word",
        "minWidth": 50,
        "minHeight": 20,
        "cursor": "default",
        "boxSizing": "content-box"
    },
    "gt_head": {
        "border": 0,
        "fontSize": 14,
        "fontWeight": "bold"
    },
    "gt_head_tr": {
        "borderBottom": "1px solid #333"
    },
    "c_pointer": {
        "cursor": "pointer"
    },
    "c_default": {
        "cursor": "pointer"
    },
    "gt_th_box": {
        "paddingTop": 0,
        "paddingRight": 20,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    ":global gt_head_tools": {
        "marginTop": 15,
        "marginRight": 0,
        "marginBottom": 15,
        "marginLeft": 0
    },
    "gt_foot_tools": {
        "marginTop": 15,
        "marginRight": 0,
        "marginBottom": 15,
        "marginLeft": 0
    },
    "gt_body": {
        "border": "solid 1px #efefef",
        "fontSize": 12
    },
    "gt_foot": {
        "border": 0,
        "fontSize": 14,
        "fontWeight": "bold"
    },
    "gt_foot tr": {
        "borderTop": "1px solid #333"
    },
    "gt_loader": {
        "textAlign": "center"
    },
    "gt_body tr td": {
        "paddingTop": 8,
        "paddingRight": 10,
        "paddingBottom": 8,
        "paddingLeft": 10,
        "border": 0
    },
    "gt_body tr:hover": {
        "backgroundColor": "#f5f5f5"
    },
    "gt_body tr:focus": {
        "backgroundColor": "#08c"
    },
    "gt_main_search": {
        "float": "right"
    },
    "gt_main_search input": {
        "paddingTop": 3,
        "paddingRight": 5,
        "paddingBottom": 3,
        "paddingLeft": 5,
        "color": "#666"
    },
    "gt_rows_selector": {
        "float": "left"
    },
    "clear": {
        "clear": "both"
    },
    "gt_pagination": {
        "marginTop": 15,
        "marginRight": 0,
        "marginBottom": 15,
        "marginLeft": 0
    },
    "gt_pgn_ttl": {
        "float": "left",
        "marginTop": 8,
        "marginRight": 0,
        "marginBottom": 8,
        "marginLeft": 0
    },
    "gt_pgn_pages": {
        "float": "right",
        "MozUserSelect": "-moz-none",
        "KhtmlUserSelect": "none",
        "WebkitUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none"
    },
    ":global gt_page": {
        "cursor": "pointer",
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "color": "#337ab7",
        "float": "left",
        "lineHeight": 1.42857,
        "marginLeft": -1,
        "paddingTop": 6,
        "paddingRight": 12,
        "paddingBottom": 6,
        "paddingLeft": 12,
        "position": "relative",
        "textDecoration": "none"
    },
    ":global gt_page_dots": {
        "cursor": "not-allowed",
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "color": "#333",
        "float": "left",
        "lineHeight": 1.42857,
        "marginLeft": -1,
        "paddingTop": 6,
        "paddingRight": 12,
        "paddingBottom": 6,
        "paddingLeft": 12,
        "position": "relative",
        "textDecoration": "none"
    },
    ":global gt_page:hover": {
        "backgroundColor": "#eee",
        "borderColor": "#ddd",
        "color": "#23527c"
    },
    ":global gt_pageprev": {
        "borderRadius": "3px 0 0 3px"
    },
    ":global gt_pagenext": {
        "borderRadius": "0 3px 3px 0"
    },
    "gt_select": {
        "border": "1px solid #ddd",
        "borderRadius": 3,
        "fontSize": 12,
        "height": 25,
        "lineHeight": 1.5,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10
    },
    "gt_select:focus": {
        "border": "1px solid #66afe9",
        "boxShadow": "0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6)",
        "outline": "0 none"
    },
    "gt_search": {
        "border": "1px solid #ddd",
        "borderRadius": 3,
        "fontSize": 12,
        "height": 20,
        "lineHeight": 1.5,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10
    },
    "gt_search:focus": {
        "border": "1px solid #66afe9",
        "boxShadow": "0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6)",
        "outline": "0 none"
    },
    ":global selected": {
        "backgroundColor": "#337ab7",
        "color": "#fff"
    },
    ":global selected:hover": {
        "backgroundColor": "#337ab7",
        "color": "#fff"
    },
    ":global sorting": {
        "background": "url('../images/sort_both.png') right center no-repeat"
    },
    ":global sorting_asc": {
        "background": "url('../images/sort_asc.png') right top no-repeat"
    },
    ":global sorting_desc": {
        "background": "url('../images/sort_desc.png') right top no-repeat"
    },
    ":global unselectable": {
        "MozUserSelect": "none",
        "OUserSelect": "none",
        "KhtmlUserSelect": "none",
        "WebkitUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none"
    },
    ":global normal_checkbox": {
        "border": "1px solid black !important",
        "borderRadius": 3,
        "content": " ",
        "marginLeft": 12,
        "marginTop": -20,
        "textAlign": "center",
        "boxSizing": "border-box",
        "display": "block",
        "width": 13,
        "height": 12,
        "top": 1.2,
        "position": "relative"
    },
    ":global select_checkbox::after": {
        "content": "\\2713",
        "textShadow": "1px 1px #25adf1, -1px -1px #25adf1, 1px -1px #25adf1, -1px 1px #25adf1",
        "marginLeft": 1
    }
});