if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createLifeCycleHook(
    ON_SHOW,
    1 | 2
    /* HookFlags.PAGE */
  );
  const onHide = /* @__PURE__ */ createLifeCycleHook(
    ON_HIDE,
    1 | 2
    /* HookFlags.PAGE */
  );
  const onLaunch = /* @__PURE__ */ createLifeCycleHook(
    ON_LAUNCH,
    1
    /* HookFlags.APP */
  );
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const onPullDownRefresh = /* @__PURE__ */ createLifeCycleHook(
    ON_PULL_DOWN_REFRESH,
    2
    /* HookFlags.PAGE */
  );
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$k = {
    __name: "UserAvatar",
    props: {
      name: {
        type: String,
        default: ""
      },
      avatarUrl: {
        type: String,
        default: ""
      },
      avatarColor: {
        type: String,
        default: "#3b82f6"
      },
      size: {
        type: Number,
        default: 40
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const initialChar = vue.computed(() => {
        if (!props.name)
          return "?";
        return props.name.trim().charAt(0).toUpperCase();
      });
      const __returned__ = { props, initialChar, computed: vue.computed };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "rounded-full flex items-center justify-center overflow-hidden shrink-0",
        style: vue.normalizeStyle({
          width: $props.size + "px",
          height: $props.size + "px",
          backgroundColor: $props.avatarColor || "#e0e0e0",
          borderRadius: "50%"
        })
      },
      [
        $props.avatarUrl ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: $props.avatarUrl,
          class: "w-full h-full",
          mode: "aspectFill"
        }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "text-white font-bold flex items-center justify-center",
            style: vue.normalizeStyle({
              fontSize: $props.size * 0.45 + "px",
              lineHeight: "1",
              display: "flex"
            })
          },
          vue.toDisplayString($setup.initialChar),
          5
          /* TEXT, STYLE */
        ))
      ],
      4
      /* STYLE */
    );
  }
  const UserAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-7abf19e0"], ["__file", "D:/uni_app/vbot-todo-android-2/components/UserAvatar.vue"]]);
  const icons = {
    "id": "2852637",
    "name": "uniui图标库",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$j = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/uni_app/vbot-todo-android-2/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  let Calendar$1 = class Calendar {
    constructor({
      selected,
      startDate,
      endDate,
      range
    } = {}) {
      this.date = this.getDateObj(/* @__PURE__ */ new Date());
      this.selected = selected || [];
      this.startDate = startDate;
      this.endDate = endDate;
      this.range = range;
      this.cleanMultipleStatus();
      this.weeks = {};
      this.lastHover = false;
    }
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      const selectDate = this.getDateObj(date);
      this.getWeeks(selectDate.fullDate);
    }
    /**
     * 清理多选状态
     */
    cleanMultipleStatus() {
      this.multipleStatus = {
        before: "",
        after: "",
        data: []
      };
    }
    setStartDate(startDate) {
      this.startDate = startDate;
    }
    setEndDate(endDate) {
      this.endDate = endDate;
    }
    getPreMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      const oldMonth = date.getMonth();
      date.setMonth(oldMonth - 1);
      const newMonth = date.getMonth();
      if (oldMonth !== 0 && newMonth - oldMonth === 0) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }
    getNextMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      const oldMonth = date.getMonth();
      date.setMonth(oldMonth + 1);
      const newMonth = date.getMonth();
      if (newMonth - oldMonth > 1) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }
    /**
     * 获取指定格式Date对象
     */
    getDateObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      return {
        fullDate: getDate(date),
        year: date.getFullYear(),
        month: addZero(date.getMonth() + 1),
        date: addZero(date.getDate()),
        day: date.getDay()
      };
    }
    /**
     * 获取上一个月日期集合
     */
    getPreMonthDays(amount, dateObj) {
      const result = [];
      for (let i = amount - 1; i >= 0; i--) {
        const month = dateObj.month - 1;
        result.push({
          date: new Date(dateObj.year, month, -i).getDate(),
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取本月日期集合
     */
    getCurrentMonthDays(amount, dateObj) {
      const result = [];
      const fullDate = this.date.fullDate;
      for (let i = 1; i <= amount; i++) {
        const currentDate = `${dateObj.year}-${dateObj.month}-${addZero(i)}`;
        const isToday = fullDate === currentDate;
        const info = this.selected && this.selected.find((item) => {
          if (this.dateEqual(currentDate, item.date)) {
            return item;
          }
        });
        if (this.startDate) {
          dateCompare(this.startDate, currentDate);
        }
        if (this.endDate) {
          dateCompare(currentDate, this.endDate);
        }
        let multiples = this.multipleStatus.data;
        let multiplesStatus = -1;
        if (this.range && multiples) {
          multiplesStatus = multiples.findIndex((item) => {
            return this.dateEqual(item, currentDate);
          });
        }
        const checked = multiplesStatus !== -1;
        result.push({
          fullDate: currentDate,
          year: dateObj.year,
          date: i,
          multiple: this.range ? checked : false,
          beforeMultiple: this.isLogicBefore(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          afterMultiple: this.isLogicAfter(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          month: dateObj.month,
          disable: this.startDate && !dateCompare(this.startDate, currentDate) || this.endDate && !dateCompare(currentDate, this.endDate),
          isToday,
          userChecked: false,
          extraInfo: info
        });
      }
      return result;
    }
    /**
     * 获取下一个月日期集合
     */
    _getNextMonthDays(amount, dateObj) {
      const result = [];
      const month = dateObj.month + 1;
      for (let i = 1; i <= amount; i++) {
        result.push({
          date: i,
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
    getInfo(date) {
      if (!date) {
        date = /* @__PURE__ */ new Date();
      }
      return this.calendar.find((item) => item.fullDate === this.getDateObj(date).fullDate);
    }
    /**
     * 比较时间是否相等
     */
    dateEqual(before, after) {
      before = new Date(fixIosDateFormat(before));
      after = new Date(fixIosDateFormat(after));
      return before.valueOf() === after.valueOf();
    }
    /**
     *  比较真实起始日期
     */
    isLogicBefore(currentDate, before, after) {
      let logicBefore = before;
      if (before && after) {
        logicBefore = dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDate);
    }
    isLogicAfter(currentDate, before, after) {
      let logicAfter = after;
      if (before && after) {
        logicAfter = dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDate);
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
    geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split("-");
      var ae = end.split("-");
      var db = /* @__PURE__ */ new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = /* @__PURE__ */ new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1e3;
      for (var k = unixDb; k <= unixDe; ) {
        k = k + 24 * 60 * 60 * 1e3;
        arr.push(this.getDateObj(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
     *  获取多选状态
     */
    setMultiple(fullDate) {
      if (!this.range)
        return;
      let {
        before,
        after
      } = this.multipleStatus;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = "";
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = "";
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this.lastHover = true;
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     *  鼠标 hover 更新多选状态
     */
    setHoverMultiple(fullDate) {
      if (!this.range || this.lastHover)
        return;
      const { before } = this.multipleStatus;
      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     * 更新默认值多选状态
     */
    setDefaultMultiple(before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this.getWeeks(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this.getWeeks(before);
        }
      }
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */
    getWeeks(dateData) {
      const {
        year,
        month
      } = this.getDateObj(dateData);
      const preMonthDayAmount = new Date(year, month - 1, 1).getDay();
      const preMonthDays = this.getPreMonthDays(preMonthDayAmount, this.getDateObj(dateData));
      const currentMonthDayAmount = new Date(year, month, 0).getDate();
      const currentMonthDays = this.getCurrentMonthDays(currentMonthDayAmount, this.getDateObj(dateData));
      const nextMonthDayAmount = 42 - preMonthDayAmount - currentMonthDayAmount;
      const nextMonthDays = this._getNextMonthDays(nextMonthDayAmount, this.getDateObj(dateData));
      const calendarDays = [...preMonthDays, ...currentMonthDays, ...nextMonthDays];
      const weeks = new Array(6);
      for (let i = 0; i < calendarDays.length; i++) {
        const index = Math.floor(i / 7);
        if (!weeks[index]) {
          weeks[index] = new Array(7);
        }
        weeks[index][i % 7] = calendarDays[i];
      }
      this.calendar = calendarDays;
      this.weeks = weeks;
    }
  };
  function getDateTime(date, hideSecond) {
    return `${getDate(date)} ${getTime(date, hideSecond)}`;
  }
  function getDate(date) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${addZero(month)}-${addZero(day)}`;
  }
  function getTime(date, hideSecond) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return hideSecond ? `${addZero(hour)}:${addZero(minute)}` : `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
  }
  function addZero(num) {
    if (num < 10) {
      num = `0${num}`;
    }
    return num;
  }
  function getDefaultSecond(hideSecond) {
    return hideSecond ? "00:00" : "00:00:00";
  }
  function dateCompare(startDate, endDate) {
    startDate = new Date(fixIosDateFormat(startDate));
    endDate = new Date(fixIosDateFormat(endDate));
    return startDate <= endDate;
  }
  function checkDate(date) {
    const dateReg = /((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;
    return date.match(dateReg);
  }
  const dateTimeReg = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])( [0-5]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])?$/;
  function fixIosDateFormat(value) {
    if (typeof value === "string" && dateTimeReg.test(value)) {
      value = value.replace(/-/g, "/");
    }
    return value;
  }
  const _sfc_main$i = {
    props: {
      weeks: {
        type: Object,
        default() {
          return {};
        }
      },
      calendar: {
        type: Object,
        default: () => {
          return {};
        }
      },
      selected: {
        type: Array,
        default: () => {
          return [];
        }
      },
      checkHover: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      choiceDate(weeks) {
        this.$emit("change", weeks);
      },
      handleMousemove(weeks) {
        this.$emit("handleMouse", weeks);
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-calendar-item__weeks-box", {
          "uni-calendar-item--disable": $props.weeks.disable,
          "uni-calendar-item--before-checked-x": $props.weeks.beforeMultiple,
          "uni-calendar-item--multiple": $props.weeks.multiple,
          "uni-calendar-item--after-checked-x": $props.weeks.afterMultiple
        }]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.choiceDate($props.weeks)),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.handleMousemove($props.weeks))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-calendar-item__weeks-box-item", {
              "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && ($props.calendar.userChecked || !$props.checkHover),
              "uni-calendar-item--checked-range-text": $props.checkHover,
              "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
              "uni-calendar-item--multiple": $props.weeks.multiple,
              "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
              "uni-calendar-item--disable": $props.weeks.disable
            }])
          },
          [
            $props.selected && $props.weeks.extraInfo ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-calendar-item__weeks-box-circle"
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "text",
              { class: "uni-calendar-item__weeks-box-text uni-calendar-item__weeks-box-text-disable uni-calendar-item--checked-text" },
              vue.toDisplayString($props.weeks.date),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass({ "uni-calendar-item--today": $props.weeks.isToday })
          },
          null,
          2
          /* CLASS */
        )
      ],
      34
      /* CLASS, NEED_HYDRATION */
    );
  }
  const calendarItem = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-3c762a01"], ["__file", "D:/uni_app/vbot-todo-android-2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar-item.vue"]]);
  const _sfc_main$h = {
    name: "UniDatetimePicker",
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        visible: false,
        fixNvueBug: {},
        dateShow: true,
        timeShow: true,
        title: "日期和时间",
        // 输入框当前时间
        time: "",
        // 当前的年月日时分秒
        year: 1920,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        // 起始时间
        startYear: 1920,
        startMonth: 1,
        startDay: 1,
        startHour: 0,
        startMinute: 0,
        startSecond: 0,
        // 结束时间
        endYear: 2120,
        endMonth: 12,
        endDay: 31,
        endHour: 23,
        endMinute: 59,
        endSecond: 59
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      hideSecond: {
        type: [Boolean, String],
        default: false
      }
    },
    watch: {
      modelValue: {
        handler(newVal) {
          if (newVal) {
            this.parseValue(fixIosDateFormat(newVal));
            this.initTime(false);
          } else {
            this.time = "";
            this.parseValue(Date.now());
          }
        },
        immediate: true
      },
      type: {
        handler(newValue) {
          if (newValue === "date") {
            this.dateShow = true;
            this.timeShow = false;
            this.title = "日期";
          } else if (newValue === "time") {
            this.dateShow = false;
            this.timeShow = true;
            this.title = "时间";
          } else {
            this.dateShow = true;
            this.timeShow = true;
            this.title = "日期和时间";
          }
        },
        immediate: true
      },
      start: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "start");
        },
        immediate: true
      },
      end: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "end");
        },
        immediate: true
      },
      // 月、日、时、分、秒可选范围变化后，检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      months(newVal) {
        this.checkValue("month", this.month, newVal);
      },
      days(newVal) {
        this.checkValue("day", this.day, newVal);
      },
      hours(newVal) {
        this.checkValue("hour", this.hour, newVal);
      },
      minutes(newVal) {
        this.checkValue("minute", this.minute, newVal);
      },
      seconds(newVal) {
        this.checkValue("second", this.second, newVal);
      }
    },
    computed: {
      // 当前年、月、日、时、分、秒选择范围
      years() {
        return this.getCurrentRange("year");
      },
      months() {
        return this.getCurrentRange("month");
      },
      days() {
        return this.getCurrentRange("day");
      },
      hours() {
        return this.getCurrentRange("hour");
      },
      minutes() {
        return this.getCurrentRange("minute");
      },
      seconds() {
        return this.getCurrentRange("second");
      },
      // picker 当前值数组
      ymd() {
        return [this.year - this.minYear, this.month - this.minMonth, this.day - this.minDay];
      },
      hms() {
        return [this.hour - this.minHour, this.minute - this.minMinute, this.second - this.minSecond];
      },
      // 当前 date 是 start
      currentDateIsStart() {
        return this.year === this.startYear && this.month === this.startMonth && this.day === this.startDay;
      },
      // 当前 date 是 end
      currentDateIsEnd() {
        return this.year === this.endYear && this.month === this.endMonth && this.day === this.endDay;
      },
      // 当前年、月、日、时、分、秒的最小值和最大值
      minYear() {
        return this.startYear;
      },
      maxYear() {
        return this.endYear;
      },
      minMonth() {
        if (this.year === this.startYear) {
          return this.startMonth;
        } else {
          return 1;
        }
      },
      maxMonth() {
        if (this.year === this.endYear) {
          return this.endMonth;
        } else {
          return 12;
        }
      },
      minDay() {
        if (this.year === this.startYear && this.month === this.startMonth) {
          return this.startDay;
        } else {
          return 1;
        }
      },
      maxDay() {
        if (this.year === this.endYear && this.month === this.endMonth) {
          return this.endDay;
        } else {
          return this.daysInMonth(this.year, this.month);
        }
      },
      minHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart) {
            return this.startHour;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          return this.startHour;
        }
      },
      maxHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd) {
            return this.endHour;
          } else {
            return 23;
          }
        }
        if (this.type === "time") {
          return this.endHour;
        }
      },
      minMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
      },
      maxMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
      },
      minSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
      },
      maxSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
      },
      /**
       * for i18n
       */
      selectTimeText() {
        return this.$t("uni-datetime-picker.selectTime");
      },
      okText() {
        return this.$t("uni-datetime-picker.ok");
      },
      clearText() {
        return this.$t("uni-datetime-picker.clear");
      },
      cancelText() {
        return this.$t("uni-datetime-picker.cancel");
      }
    },
    mounted() {
    },
    methods: {
      /**
       * @param {Object} item
       * 小于 10 在前面加个 0
       */
      lessThanTen(item) {
        return item < 10 ? "0" + item : item;
      },
      /**
       * 解析时分秒字符串，例如：00:00:00
       * @param {String} timeString
       */
      parseTimeType(timeString) {
        if (timeString) {
          let timeArr = timeString.split(":");
          this.hour = Number(timeArr[0]);
          this.minute = Number(timeArr[1]);
          this.second = Number(timeArr[2]);
        }
      },
      /**
       * 解析选择器初始值，类型可以是字符串、时间戳，例如：2000-10-02、'08:30:00'、 1610695109000
       * @param {String | Number} datetime
       */
      initPickerValue(datetime2) {
        let defaultValue = null;
        if (datetime2) {
          defaultValue = this.compareValueWithStartAndEnd(datetime2, this.start, this.end);
        } else {
          defaultValue = Date.now();
          defaultValue = this.compareValueWithStartAndEnd(defaultValue, this.start, this.end);
        }
        this.parseValue(defaultValue);
      },
      /**
       * 初始值规则：
       * - 用户设置初始值 value
       * 	- 设置了起始时间 start、终止时间 end，并 start < value < end，初始值为 value， 否则初始值为 start
       * 	- 只设置了起始时间 start，并 start < value，初始值为 value，否则初始值为 start
       * 	- 只设置了终止时间 end，并 value < end，初始值为 value，否则初始值为 end
       * 	- 无起始终止时间，则初始值为 value
       * - 无初始值 value，则初始值为当前本地时间 Date.now()
       * @param {Object} value
       * @param {Object} dateBase
       */
      compareValueWithStartAndEnd(value, start, end) {
        let winner = null;
        value = this.superTimeStamp(value);
        start = this.superTimeStamp(start);
        end = this.superTimeStamp(end);
        if (start && end) {
          if (value < start) {
            winner = new Date(start);
          } else if (value > end) {
            winner = new Date(end);
          } else {
            winner = new Date(value);
          }
        } else if (start && !end) {
          winner = start <= value ? new Date(value) : new Date(start);
        } else if (!start && end) {
          winner = value <= end ? new Date(value) : new Date(end);
        } else {
          winner = new Date(value);
        }
        return winner;
      },
      /**
       * 转换为可比较的时间戳，接受日期、时分秒、时间戳
       * @param {Object} value
       */
      superTimeStamp(value) {
        let dateBase = "";
        if (this.type === "time" && value && typeof value === "string") {
          const now2 = /* @__PURE__ */ new Date();
          const year = now2.getFullYear();
          const month = now2.getMonth() + 1;
          const day = now2.getDate();
          dateBase = year + "/" + month + "/" + day + " ";
        }
        if (Number(value)) {
          value = parseInt(value);
          dateBase = 0;
        }
        return this.createTimeStamp(dateBase + value);
      },
      /**
       * 解析默认值 value，字符串、时间戳
       * @param {Object} defaultTime
       */
      parseValue(value) {
        if (!value) {
          return;
        }
        if (this.type === "time" && typeof value === "string") {
          this.parseTimeType(value);
        } else {
          let defaultDate = null;
          defaultDate = new Date(value);
          if (this.type !== "time") {
            this.year = defaultDate.getFullYear();
            this.month = defaultDate.getMonth() + 1;
            this.day = defaultDate.getDate();
          }
          if (this.type !== "date") {
            this.hour = defaultDate.getHours();
            this.minute = defaultDate.getMinutes();
            this.second = defaultDate.getSeconds();
          }
        }
        if (this.hideSecond) {
          this.second = 0;
        }
      },
      /**
       * 解析可选择时间范围 start、end，年月日字符串、时间戳
       * @param {Object} defaultTime
       */
      parseDatetimeRange(point, pointType) {
        if (!point) {
          if (pointType === "start") {
            this.startYear = 1920;
            this.startMonth = 1;
            this.startDay = 1;
            this.startHour = 0;
            this.startMinute = 0;
            this.startSecond = 0;
          }
          if (pointType === "end") {
            this.endYear = 2120;
            this.endMonth = 12;
            this.endDay = 31;
            this.endHour = 23;
            this.endMinute = 59;
            this.endSecond = 59;
          }
          return;
        }
        if (this.type === "time") {
          const pointArr = point.split(":");
          this[pointType + "Hour"] = Number(pointArr[0]);
          this[pointType + "Minute"] = Number(pointArr[1]);
          this[pointType + "Second"] = Number(pointArr[2]);
        } else {
          if (!point) {
            pointType === "start" ? this.startYear = this.year - 60 : this.endYear = this.year + 60;
            return;
          }
          if (Number(point)) {
            point = parseInt(point);
          }
          const hasTime = /[0-9]:[0-9]/;
          if (this.type === "datetime" && pointType === "end" && typeof point === "string" && !hasTime.test(
            point
          )) {
            point = point + " 23:59:59";
          }
          const pointDate = new Date(point);
          this[pointType + "Year"] = pointDate.getFullYear();
          this[pointType + "Month"] = pointDate.getMonth() + 1;
          this[pointType + "Day"] = pointDate.getDate();
          if (this.type === "datetime") {
            this[pointType + "Hour"] = pointDate.getHours();
            this[pointType + "Minute"] = pointDate.getMinutes();
            this[pointType + "Second"] = pointDate.getSeconds();
          }
        }
      },
      // 获取 年、月、日、时、分、秒 当前可选范围
      getCurrentRange(value) {
        const range = [];
        for (let i = this["min" + this.capitalize(value)]; i <= this["max" + this.capitalize(value)]; i++) {
          range.push(i);
        }
        return range;
      },
      // 字符串首字母大写
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      // 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      checkValue(name, value, values) {
        if (values.indexOf(value) === -1) {
          this[name] = values[0];
        }
      },
      // 每个月的实际天数
      daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
      },
      //兼容 iOS、safari 日期格式
      fixIosDateFormat(value) {
        if (typeof value === "string") {
          value = value.replace(/-/g, "/");
        }
        return value;
      },
      /**
       * 生成时间戳
       * @param {Object} time
       */
      createTimeStamp(time) {
        if (!time)
          return;
        if (typeof time === "number") {
          return time;
        } else {
          time = time.replace(/-/g, "/");
          if (this.type === "date") {
            time = time + " 00:00:00";
          }
          return Date.parse(time);
        }
      },
      /**
       * 生成日期或时间的字符串
       */
      createDomSting() {
        const yymmdd = this.year + "-" + this.lessThanTen(this.month) + "-" + this.lessThanTen(this.day);
        let hhmmss = this.lessThanTen(this.hour) + ":" + this.lessThanTen(this.minute);
        if (!this.hideSecond) {
          hhmmss = hhmmss + ":" + this.lessThanTen(this.second);
        }
        if (this.type === "date") {
          return yymmdd;
        } else if (this.type === "time") {
          return hhmmss;
        } else {
          return yymmdd + " " + hhmmss;
        }
      },
      /**
       * 初始化返回值，并抛出 change 事件
       */
      initTime(emit = true) {
        this.time = this.createDomSting();
        if (!emit)
          return;
        if (this.returnType === "timestamp" && this.type !== "time") {
          this.$emit("change", this.createTimeStamp(this.time));
          this.$emit("input", this.createTimeStamp(this.time));
          this.$emit("update:modelValue", this.createTimeStamp(this.time));
        } else {
          this.$emit("change", this.time);
          this.$emit("input", this.time);
          this.$emit("update:modelValue", this.time);
        }
      },
      /**
       * 用户选择日期或时间更新 data
       * @param {Object} e
       */
      bindDateChange(e) {
        const val = e.detail.value;
        this.year = this.years[val[0]];
        this.month = this.months[val[1]];
        this.day = this.days[val[2]];
      },
      bindTimeChange(e) {
        const val = e.detail.value;
        this.hour = this.hours[val[0]];
        this.minute = this.minutes[val[1]];
        this.second = this.seconds[val[2]];
      },
      /**
       * 初始化弹出层
       */
      initTimePicker() {
        if (this.disabled)
          return;
        const value = fixIosDateFormat(this.time);
        this.initPickerValue(value);
        this.visible = !this.visible;
      },
      /**
       * 触发或关闭弹框
       */
      tiggerTimePicker(e) {
        this.visible = !this.visible;
      },
      /**
       * 用户点击“清空”按钮，清空当前值
       */
      clearTime() {
        this.time = "";
        this.$emit("change", this.time);
        this.$emit("input", this.time);
        this.$emit("update:modelValue", this.time);
        this.tiggerTimePicker();
      },
      /**
       * 用户点击“确定”按钮
       */
      setTime() {
        this.initTime();
        this.tiggerTimePicker();
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-datetime-picker" }, [
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.initTimePicker && $options.initTimePicker(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-datetime-picker-timebox-pointer", { "uni-datetime-picker-disabled": $props.disabled, "uni-datetime-picker-timebox": $props.border }])
            },
            [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-text" },
                vue.toDisplayString($data.time),
                1
                /* TEXT */
              ),
              !$data.time ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-datetime-picker-time"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-text" },
                  vue.toDisplayString($options.selectTimeText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      $data.visible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        id: "mask",
        class: "uni-datetime-picker-mask",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
      })) : vue.createCommentVNode("v-if", true),
      $data.visible ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: vue.normalizeClass(["uni-datetime-picker-popup", [$data.dateShow && $data.timeShow ? "" : "fix-nvue-height"]]),
          style: vue.normalizeStyle($data.fixNvueBug)
        },
        [
          vue.createElementVNode("view", { class: "uni-title" }, [
            vue.createElementVNode(
              "text",
              { class: "uni-datetime-picker-text" },
              vue.toDisplayString($options.selectTimeText),
              1
              /* TEXT */
            )
          ]),
          $data.dateShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: "uni-datetime-picker-view",
              "indicator-style": $data.indicatorStyle,
              value: $options.ymd,
              onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.years, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.months, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.days, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 40, ["indicator-style", "value"]),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-left" }, "-"),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-right" }, "-")
          ])) : vue.createCommentVNode("v-if", true),
          $data.timeShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: vue.normalizeClass(["uni-datetime-picker-view", [$props.hideSecond ? "time-hide-second" : ""]]),
              "indicator-style": $data.indicatorStyle,
              value: $options.hms,
              onChange: _cache[3] || (_cache[3] = (...args) => $options.bindTimeChange && $options.bindTimeChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.hours, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.minutes, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.seconds, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 42, ["indicator-style", "value"]),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["uni-datetime-picker-sign", [$props.hideSecond ? "sign-center" : "sign-left"]])
              },
              ":",
              2
              /* CLASS */
            ),
            !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-datetime-picker-sign sign-right"
            }, ":")) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uni-datetime-picker-btn" }, [
            vue.createElementVNode("view", {
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clearTime && $options.clearTime(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-btn-text" },
                vue.toDisplayString($options.clearText),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "uni-datetime-picker-btn-group" }, [
              vue.createElementVNode("view", {
                class: "uni-datetime-picker-cancel",
                onClick: _cache[5] || (_cache[5] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.cancelText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[6] || (_cache[6] = (...args) => $options.setTime && $options.setTime(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-1d532b70"], ["__file", "D:/uni_app/vbot-todo-android-2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/time-picker.vue"]]);
  const _sfc_main$g = {
    components: {
      calendarItem,
      timePicker: TimePicker
    },
    props: {
      date: {
        type: String,
        default: ""
      },
      defTime: {
        type: [String, Object],
        default: ""
      },
      selectableTimes: {
        type: [Object],
        default() {
          return {};
        }
      },
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      startDate: {
        type: String,
        default: ""
      },
      endDate: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      range: {
        type: Boolean,
        default: false
      },
      hasTime: {
        type: Boolean,
        default: false
      },
      insert: {
        type: Boolean,
        default: true
      },
      showMonth: {
        type: Boolean,
        default: true
      },
      clearDate: {
        type: Boolean,
        default: true
      },
      checkHover: {
        type: Boolean,
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      pleStatus: {
        type: Object,
        default() {
          return {
            before: "",
            after: "",
            data: [],
            fulldate: ""
          };
        }
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    data() {
      return {
        show: false,
        weeks: [],
        pickerYears: [],
        calendar: {},
        nowDate: {},
        aniMaskShow: false,
        firstEnter: true,
        time: "",
        timeRange: {
          startTime: "",
          endTime: ""
        },
        tempSingleDate: "",
        tempRange: {
          before: "",
          after: ""
        }
      };
    },
    watch: {
      date: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.tempSingleDate = newVal;
            setTimeout(() => {
              this.init(newVal);
            }, 100);
          }
        }
      },
      defTime: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.time = newVal;
          } else {
            this.timeRange.startTime = newVal.start;
            this.timeRange.endTime = newVal.end;
          }
        }
      },
      startDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setStartDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      endDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setEndDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      selected(newVal) {
        if (!this.cale) {
          return;
        }
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.weeks = this.cale.weeks;
      },
      pleStatus: {
        immediate: true,
        handler(newVal) {
          const {
            before,
            after,
            fulldate,
            which
          } = newVal;
          this.tempRange.before = before;
          this.tempRange.after = after;
          setTimeout(() => {
            if (fulldate) {
              this.cale.setHoverMultiple(fulldate);
              if (before && after) {
                this.cale.lastHover = true;
                if (this.rangeWithinMonth(after, before))
                  return;
                this.setDate(before);
              } else {
                this.cale.setMultiple(fulldate);
                this.setDate(this.nowDate.fullDate);
                this.calendar.fullDate = "";
                this.cale.lastHover = false;
              }
            } else {
              if (!this.cale) {
                return;
              }
              this.cale.setDefaultMultiple(before, after);
              if (which === "left" && before) {
                this.setDate(before);
                this.weeks = this.cale.weeks;
              } else if (after) {
                this.setDate(after);
                this.weeks = this.cale.weeks;
              }
              this.cale.lastHover = true;
            }
          }, 16);
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.range ? this.tempRange.before : this.calendar.fullDate;
        return activeDate === this.startDate ? this.selectableTimes.start : "";
      },
      timepickerEndTime() {
        const activeDate = this.range ? this.tempRange.after : this.calendar.fullDate;
        return activeDate === this.endDate ? this.selectableTimes.end : "";
      },
      /**
       * for i18n
       */
      selectDateText() {
        return this.$t("uni-datetime-picker.selectDate");
      },
      startDateText() {
        return this.startPlaceholder || this.$t("uni-datetime-picker.startDate");
      },
      endDateText() {
        return this.endPlaceholder || this.$t("uni-datetime-picker.endDate");
      },
      okText() {
        return this.$t("uni-datetime-picker.ok");
      },
      yearText() {
        return this.$t("uni-datetime-picker.year");
      },
      monthText() {
        return this.$t("uni-datetime-picker.month");
      },
      MONText() {
        return this.$t("uni-calender.MON");
      },
      TUEText() {
        return this.$t("uni-calender.TUE");
      },
      WEDText() {
        return this.$t("uni-calender.WED");
      },
      THUText() {
        return this.$t("uni-calender.THU");
      },
      FRIText() {
        return this.$t("uni-calender.FRI");
      },
      SATText() {
        return this.$t("uni-calender.SAT");
      },
      SUNText() {
        return this.$t("uni-calender.SUN");
      },
      confirmText() {
        return this.$t("uni-calender.confirm");
      },
      pickerMonths() {
        return [
          this.$t("uni-calender.jan"),
          this.$t("uni-calender.feb"),
          this.$t("uni-calender.mar"),
          this.$t("uni-calender.apr"),
          this.$t("uni-calender.may"),
          this.$t("uni-calender.jun"),
          this.$t("uni-calender.jul"),
          this.$t("uni-calender.aug"),
          this.$t("uni-calender.sep"),
          this.$t("uni-calender.oct"),
          this.$t("uni-calender.nov"),
          this.$t("uni-calender.dec")
        ];
      },
      // Gom năm và tháng vào mảng cho picker hiển thị (Cột 0: Năm, Cột 1: Tháng)
      pickerRange() {
        return [this.pickerYears, this.pickerMonths];
      },
      // Tính toán vị trí hiển thị hiện tại
      pickerIndex() {
        if (!this.nowDate || !this.nowDate.year)
          return [0, 0];
        const yearStr = String(this.nowDate.year);
        const yearIdx = this.pickerYears.indexOf(yearStr);
        const monthIdx = parseInt(this.nowDate.month) - 1;
        return [
          yearIdx >= 0 ? yearIdx : 0,
          monthIdx >= 0 ? monthIdx : 0
        ];
      }
    },
    created() {
      this.cale = new Calendar$1({
        selected: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        range: this.range
      });
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      for (let i = 1900; i <= currentYear + 100; i++) {
        this.pickerYears.push(String(i));
      }
      this.init(this.date);
    },
    methods: {
      bindMultiPickerChange(e) {
        const [yearIndex, monthIndex] = e.detail.value;
        const year = this.pickerYears[yearIndex];
        const month = monthIndex + 1;
        const dateStr = `${year}-${month < 10 ? "0" + month : month}-01`;
        this.setDate(dateStr);
        this.monthSwitch();
      },
      leaveCale() {
        this.firstEnter = true;
      },
      handleMouse(weeks) {
        if (weeks.disable)
          return;
        if (this.cale.lastHover)
          return;
        let {
          before,
          after
        } = this.cale.multipleStatus;
        if (!before)
          return;
        this.calendar = weeks;
        this.cale.setHoverMultiple(this.calendar.fullDate);
        this.weeks = this.cale.weeks;
        if (this.firstEnter) {
          this.$emit("firstEnterCale", this.cale.multipleStatus);
          this.firstEnter = false;
        }
      },
      rangeWithinMonth(A, B) {
        const [yearA, monthA] = A.split("-");
        const [yearB, monthB] = B.split("-");
        return yearA === yearB && monthA === monthB;
      },
      // 蒙版点击事件
      maskClick() {
        this.close();
        this.$emit("maskClose");
      },
      clearCalender() {
        if (this.range) {
          this.timeRange.startTime = "";
          this.timeRange.endTime = "";
          this.tempRange.before = "";
          this.tempRange.after = "";
          this.cale.multipleStatus.before = "";
          this.cale.multipleStatus.after = "";
          this.cale.multipleStatus.data = [];
          this.cale.lastHover = false;
        } else {
          this.time = "";
          this.tempSingleDate = "";
        }
        this.calendar.fullDate = "";
        this.setDate(/* @__PURE__ */ new Date());
      },
      bindDateChange(e) {
        const value = e.detail.value + "-1";
        this.setDate(value);
      },
      /**
       * 初始化日期显示
       * @param {Object} date
       */
      init(date) {
        if (!this.cale) {
          return;
        }
        this.cale.setDate(date || /* @__PURE__ */ new Date());
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
        this.calendar = { ...this.nowDate };
        if (!date) {
          this.calendar.fullDate = "";
          if (this.defaultValue && !this.range) {
            const defaultDate = new Date(this.defaultValue);
            const fullDate = getDate(defaultDate);
            const year = defaultDate.getFullYear();
            const month = defaultDate.getMonth() + 1;
            const date2 = defaultDate.getDate();
            const day = defaultDate.getDay();
            this.calendar = {
              fullDate,
              year,
              month,
              date: date2,
              day
            }, this.tempSingleDate = fullDate;
            this.time = getTime(defaultDate, this.hideSecond);
          }
        }
      },
      /**
       * 打开日历弹窗
       */
      open() {
        if (this.clearDate && !this.insert) {
          this.cale.cleanMultipleStatus();
        }
        this.init(this.date);
        if (!this.range && this.date) {
          this.tempSingleDate = this.date;
        }
        if (!this.range) {
          if (this.defTime) {
            this.time = this.defTime;
          }
        } else {
          if (this.defTime && this.defTime.start) {
            this.timeRange.startTime = this.defTime.start;
            this.timeRange.endTime = this.defTime.end;
          }
        }
        this.show = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.aniMaskShow = true;
          }, 50);
        });
      },
      /**
       * 关闭日历弹窗
       */
      close() {
        this.aniMaskShow = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.show = false;
            this.$emit("close");
          }, 300);
        });
      },
      /**
       * 确认按钮
       */
      confirm() {
        this.setEmit("confirm");
        this.close();
      },
      /**
       * 变化触发
       */
      change() {
        if (!this.insert)
          return;
        this.setEmit("change");
      },
      /**
       * 选择月份触发
       */
      monthSwitch() {
        let {
          year,
          month
        } = this.nowDate;
        this.$emit("monthSwitch", {
          year,
          month: Number(month)
        });
      },
      /**
       * 派发事件
       * @param {Object} name
       */
      setEmit(name) {
        if (!this.range) {
          if (!this.calendar.fullDate) {
            this.calendar = this.cale.getInfo(/* @__PURE__ */ new Date());
            this.tempSingleDate = this.calendar.fullDate;
          }
          if (this.hasTime && !this.time) {
            this.time = getTime(/* @__PURE__ */ new Date(), this.hideSecond);
          }
        }
        let {
          year,
          month,
          date,
          fullDate,
          extraInfo
        } = this.calendar;
        this.$emit(name, {
          range: this.cale.multipleStatus,
          year,
          month,
          date,
          time: this.time,
          timeRange: this.timeRange,
          fulldate: fullDate,
          extraInfo: extraInfo || {}
        });
      },
      /**
       * 选择天触发
       * @param {Object} weeks
       */
      choiceDate(weeks) {
        if (weeks.disable)
          return;
        this.calendar = weeks;
        this.calendar.userChecked = true;
        this.cale.setMultiple(this.calendar.fullDate, true);
        this.weeks = this.cale.weeks;
        this.tempSingleDate = this.calendar.fullDate;
        const beforeDate = new Date(this.cale.multipleStatus.before).getTime();
        const afterDate = new Date(this.cale.multipleStatus.after).getTime();
        if (beforeDate > afterDate && afterDate) {
          this.tempRange.before = this.cale.multipleStatus.after;
          this.tempRange.after = this.cale.multipleStatus.before;
        } else {
          this.tempRange.before = this.cale.multipleStatus.before;
          this.tempRange.after = this.cale.multipleStatus.after;
        }
        this.change();
      },
      changeMonth(type) {
        let newDate;
        if (type === "pre") {
          newDate = this.cale.getPreMonthObj(this.nowDate.fullDate).fullDate;
        } else if (type === "next") {
          newDate = this.cale.getNextMonthObj(this.nowDate.fullDate).fullDate;
        }
        this.setDate(newDate);
        this.monthSwitch();
      },
      /**
       * 设置日期
       * @param {Object} date
       */
      setDate(date) {
        this.cale.setDate(date);
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_item = vue.resolveComponent("calendar-item");
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-calendar",
        onMouseleave: _cache[9] || (_cache[9] = (...args) => $options.leaveCale && $options.leaveCale(...args))
      },
      [
        !$props.insert && $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uni-calendar__mask", { "uni-calendar--mask-show": $data.aniMaskShow }]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.maskClick && $options.maskClick(...args))
          },
          null,
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true),
        $props.insert || $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["uni-calendar__content", { "uni-calendar--fixed": !$props.insert, "uni-calendar--ani-show": $data.aniMaskShow, "uni-calendar__content-mobile": $data.aniMaskShow }])
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-calendar__header", { "uni-calendar__header-mobile": !$props.insert }])
              },
              [
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => $options.changeMonth("pre"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--left" })
                ]),
                vue.createElementVNode("picker", {
                  mode: "multiSelector",
                  range: $options.pickerRange,
                  value: $options.pickerIndex,
                  onChange: _cache[2] || (_cache[2] = (...args) => $options.bindMultiPickerChange && $options.bindMultiPickerChange(...args))
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__header-text" },
                    vue.toDisplayString($options.monthText + " " + ($data.nowDate.month || "") + " " + $options.yearText + " " + ($data.nowDate.year || "")),
                    1
                    /* TEXT */
                  )
                ], 40, ["range", "value"]),
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => $options.changeMonth("next"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--right" })
                ]),
                !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "dialog-close",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.close && $options.close(...args))
                }, [
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus",
                    "data-id": "close"
                  }),
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus dialog-close-rotate",
                    "data-id": "close"
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "uni-calendar__box" }, [
              $props.showMonth ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-calendar__box-bg"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__box-bg-text" },
                  vue.toDisplayString($data.nowDate.month),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "uni-calendar__weeks",
                style: { "padding-bottom": "7px" }
              }, [
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SUNText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.MONText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.TUEText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.WEDText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.THUText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.FRIText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SATText),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.weeks, (item, weekIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "uni-calendar__weeks",
                    key: weekIndex
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item, (weeks, weeksIndex) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "uni-calendar__weeks-item",
                          key: weeksIndex
                        }, [
                          vue.createVNode(_component_calendar_item, {
                            class: "uni-calendar-item--hook",
                            weeks,
                            calendar: $data.calendar,
                            selected: $props.selected,
                            checkHover: $props.range,
                            onChange: $options.choiceDate,
                            onHandleMouse: $options.handleMouse
                          }, null, 8, ["weeks", "calendar", "selected", "checkHover", "onChange", "onHandleMouse"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            !$props.insert && !$props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-date-changed uni-calendar--fixed-top",
              style: { "padding": "0 80px" }
            }, [
              vue.createElementVNode(
                "view",
                { class: "uni-date-changed--time-date" },
                vue.toDisplayString($data.tempSingleDate ? $data.tempSingleDate : $options.selectDateText),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_time_picker, {
                type: "time",
                start: $options.timepickerStartTime,
                end: $options.timepickerEndTime,
                modelValue: $data.time,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.time = $event),
                disabled: !$data.tempSingleDate,
                border: false,
                "hide-second": $props.hideSecond,
                class: "time-picker-style"
              }, null, 8, ["start", "end", "modelValue", "disabled", "hide-second"])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert && $props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uni-date-changed uni-calendar--fixed-top"
            }, [
              vue.createElementVNode("view", { class: "uni-date-changed--time-start" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.before ? $data.tempRange.before : $options.startDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  start: $options.timepickerStartTime,
                  modelValue: $data.timeRange.startTime,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.timeRange.startTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.before,
                  class: "time-picker-style"
                }, null, 8, ["start", "modelValue", "hide-second", "disabled"])
              ]),
              vue.createElementVNode("view", { style: { "line-height": "50px" } }, [
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999"
                })
              ]),
              vue.createElementVNode("view", { class: "uni-date-changed--time-end" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.after ? $data.tempRange.after : $options.endDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  end: $options.timepickerEndTime,
                  modelValue: $data.timeRange.endTime,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.timeRange.endTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.after,
                  class: "time-picker-style"
                }, null, 8, ["end", "modelValue", "hide-second", "disabled"])
              ])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "uni-date-changed uni-date-btn--ok"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "uni-datetime-picker--btn",
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.confirm && $options.confirm(...args))
                },
                vue.toDisplayString($options.confirmText),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      32
      /* NEED_HYDRATION */
    );
  }
  const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-1d379219"], ["__file", "D:/uni_app/vbot-todo-android-2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue"]]);
  const _sfc_main$f = {
    name: "UniDatetimePicker",
    options: {
      virtualHost: true
    },
    components: {
      Calendar,
      TimePicker
    },
    data() {
      return {
        isRange: false,
        hasTime: false,
        displayValue: "",
        inputDate: "",
        calendarDate: "",
        pickerTime: "",
        calendarRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        displayRangeValue: {
          startDate: "",
          endDate: ""
        },
        tempRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        // 左右日历同步数据
        startMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        endMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        pickerVisible: false,
        pickerPositionStyle: null,
        isEmitValue: false,
        isPhone: false,
        isFirstShow: true
        // i18nT: () => {}
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number, Array, Date],
        default: ""
      },
      modelValue: {
        type: [String, Number, Array, Date],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      placeholder: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      rangeSeparator: {
        type: String,
        default: "-"
      },
      border: {
        type: [Boolean],
        default: true
      },
      disabled: {
        type: [Boolean],
        default: false
      },
      clearIcon: {
        type: [Boolean],
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    watch: {
      type: {
        immediate: true,
        handler(newVal) {
          this.hasTime = newVal.indexOf("time") !== -1;
          this.isRange = newVal.indexOf("range") !== -1;
        }
      },
      value: {
        handler(newVal) {
          if (this.isEmitValue) {
            this.isEmitValue = false;
            return;
          }
          this.initPicker(newVal);
        },
        immediate: true
      },
      // #endif
      // #ifdef VUE3
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (this.isEmitValue) {
            this.isEmitValue = false;
            return;
          }
          this.initPicker(newVal);
        }
      },
      // #endif
      start: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.startDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.startTime = getTime(newVal);
          }
        }
      },
      end: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.endDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.endTime = getTime(newVal, this.hideSecond);
          }
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.isRange ? this.tempRange.startDate : this.inputDate;
        return activeDate === this.calendarRange.startDate ? this.calendarRange.startTime : "";
      },
      timepickerEndTime() {
        const activeDate = this.isRange ? this.tempRange.endDate : this.inputDate;
        return activeDate === this.calendarRange.endDate ? this.calendarRange.endTime : "";
      },
      mobileCalendarTime() {
        const timeRange = {
          start: this.tempRange.startTime,
          end: this.tempRange.endTime
        };
        return this.isRange ? timeRange : this.pickerTime;
      },
      mobSelectableTime() {
        return {
          start: this.calendarRange.startTime,
          end: this.calendarRange.endTime
        };
      },
      datePopupWidth() {
        return this.isRange ? 653 : 301;
      },
      /**
       * for i18n
       */
      singlePlaceholderText() {
        return this.placeholder || (this.type === "date" ? this.selectDateText : this.selectDateTimeText);
      },
      startPlaceholderText() {
        return this.startPlaceholder || this.startDateText;
      },
      endPlaceholderText() {
        return this.endPlaceholder || this.endDateText;
      },
      selectDateText() {
        return this.$t("uni-datetime-picker.selectDate");
      },
      selectDateTimeText() {
        return this.$t("uni-datetime-picker.selectDateTime");
      },
      selectTimeText() {
        return this.$t("uni-datetime-picker.selectTime");
      },
      startDateText() {
        return this.startPlaceholder || this.$t("uni-datetime-picker.startDate");
      },
      startTimeText() {
        return this.$t("uni-datetime-picker.startTime");
      },
      endDateText() {
        return this.endPlaceholder || this.$t("uni-datetime-picker.endDate");
      },
      endTimeText() {
        return this.$t("uni-datetime-picker.endTime");
      },
      okText() {
        return this.$t("uni-datetime-picker.ok");
      },
      clearText() {
        return this.$t("uni-datetime-picker.clear");
      },
      showClearIcon() {
        return this.clearIcon && !this.disabled && (this.displayValue || this.displayRangeValue.startDate && this.displayRangeValue.endDate);
      }
    },
    created() {
      this.platform();
    },
    methods: {
      // initI18nT() {
      //   const vueI18n = initVueI18n(i18nMessages)
      //   this.i18nT = vueI18n.t
      // },
      initPicker(newVal) {
        if (!newVal && !this.defaultValue || Array.isArray(newVal) && !newVal.length) {
          this.$nextTick(() => {
            this.clear(false);
          });
          return;
        }
        if (!Array.isArray(newVal) && !this.isRange) {
          if (newVal) {
            this.displayValue = this.inputDate = this.calendarDate = getDate(newVal);
            if (this.hasTime) {
              this.pickerTime = getTime(newVal, this.hideSecond);
              this.displayValue = `${this.displayValue} ${this.pickerTime}`;
            }
          } else if (this.defaultValue) {
            this.inputDate = this.calendarDate = getDate(this.defaultValue);
            if (this.hasTime) {
              this.pickerTime = getTime(this.defaultValue, this.hideSecond);
            }
          }
        } else {
          const [before, after] = newVal;
          if (!before && !after)
            return;
          const beforeDate = getDate(before);
          const beforeTime = getTime(before, this.hideSecond);
          const afterDate = getDate(after);
          const afterTime = getTime(after, this.hideSecond);
          const startDate = beforeDate;
          const endDate = afterDate;
          this.displayRangeValue.startDate = this.tempRange.startDate = startDate;
          this.displayRangeValue.endDate = this.tempRange.endDate = endDate;
          if (this.hasTime) {
            this.displayRangeValue.startDate = `${beforeDate} ${beforeTime}`;
            this.displayRangeValue.endDate = `${afterDate} ${afterTime}`;
            this.tempRange.startTime = beforeTime;
            this.tempRange.endTime = afterTime;
          }
          const defaultRange = {
            before: beforeDate,
            after: afterDate
          };
          this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, defaultRange, {
            which: "right"
          });
          this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, defaultRange, {
            which: "left"
          });
        }
      },
      updateLeftCale(e) {
        const left = this.$refs.left;
        left.cale.setHoverMultiple(e.after);
        left.setDate(this.$refs.left.nowDate.fullDate);
      },
      updateRightCale(e) {
        const right = this.$refs.right;
        right.cale.setHoverMultiple(e.after);
        right.setDate(this.$refs.right.nowDate.fullDate);
      },
      platform() {
        if (typeof navigator !== "undefined") {
          this.isPhone = navigator.userAgent.toLowerCase().indexOf("mobile") !== -1;
          return;
        }
        const { windowWidth } = uni.getSystemInfoSync();
        this.isPhone = windowWidth <= 500;
        this.windowWidth = windowWidth;
      },
      show() {
        if (this.disabled) {
          return;
        }
        this.platform();
        if (this.isPhone) {
          setTimeout(() => {
            this.$refs.mobile.open();
          }, 0);
          return;
        }
        this.pickerPositionStyle = {
          top: "10px"
        };
        const dateEditor = uni.createSelectorQuery().in(this).select(".uni-date-editor");
        dateEditor.boundingClientRect((rect) => {
          if (this.windowWidth - rect.left < this.datePopupWidth) {
            this.pickerPositionStyle.right = 0;
          }
        }).exec();
        setTimeout(() => {
          this.pickerVisible = !this.pickerVisible;
          if (this.pickerVisible) {
            if (!this.isRange && this.$refs.pcSingle) {
              this.$refs.pcSingle.init(this.calendarDate);
            } else if (this.isRange && this.$refs.left && this.$refs.right) {
              this.$refs.left.init(this.calendarRange.startDate);
              this.$refs.right.init(this.calendarRange.endDate);
            }
          }
          if (!this.isPhone && this.isRange && this.isFirstShow) {
            this.isFirstShow = false;
            const { startDate, endDate } = this.calendarRange;
            if (startDate && endDate) {
              if (this.diffDate(startDate, endDate) < 30) {
                this.$refs.right.changeMonth("pre");
              }
            } else {
              this.$refs.right.changeMonth("next");
              if (this.isPhone) {
                this.$refs.right.cale.lastHover = false;
              }
            }
          }
        }, 50);
      },
      close() {
        setTimeout(() => {
          this.pickerVisible = false;
          this.$emit("maskClick", this.value);
          this.$refs.mobile && this.$refs.mobile.close();
        }, 20);
      },
      setEmit(value) {
        if (this.returnType === "timestamp" || this.returnType === "date") {
          if (!Array.isArray(value)) {
            if (!this.hasTime) {
              value = value + " 00:00:00";
            }
            value = this.createTimestamp(value);
            if (this.returnType === "date") {
              value = new Date(value);
            }
          } else {
            if (!this.hasTime) {
              value[0] = value[0] + " 00:00:00";
              value[1] = value[1] + " 00:00:00";
            }
            value[0] = this.createTimestamp(value[0]);
            value[1] = this.createTimestamp(value[1]);
            if (this.returnType === "date") {
              value[0] = new Date(value[0]);
              value[1] = new Date(value[1]);
            }
          }
        }
        this.$emit("update:modelValue", value);
        this.$emit("input", value);
        this.$emit("change", value);
        this.isEmitValue = true;
      },
      createTimestamp(date) {
        date = fixIosDateFormat(date);
        return Date.parse(new Date(date));
      },
      singleChange(e) {
        this.calendarDate = this.inputDate = e.fulldate;
        if (this.hasTime)
          return;
        this.confirmSingleChange();
      },
      confirmSingleChange() {
        if (!checkDate(this.inputDate)) {
          const now2 = /* @__PURE__ */ new Date();
          this.calendarDate = this.inputDate = getDate(now2);
          this.pickerTime = getTime(now2, this.hideSecond);
        }
        let startLaterInputDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(startDate, this.inputDate)) {
            startLaterInputDate = true;
            this.inputDate = startDate;
          }
        }
        let endEarlierInputDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.inputDate, endDate)) {
            endEarlierInputDate = true;
            this.inputDate = endDate;
          }
        }
        if (this.hasTime) {
          if (startLaterInputDate) {
            this.pickerTime = startTime || getDefaultSecond(this.hideSecond);
          }
          if (endEarlierInputDate) {
            this.pickerTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.pickerTime) {
            this.pickerTime = getTime(Date.now(), this.hideSecond);
          }
          this.displayValue = `${this.inputDate} ${this.pickerTime}`;
        } else {
          this.displayValue = this.inputDate;
        }
        this.setEmit(this.displayValue);
        this.pickerVisible = false;
      },
      leftChange(e) {
        const {
          before,
          after
        } = e.range;
        this.rangeChange(before, after);
        const obj = {
          before: e.range.before,
          after: e.range.after,
          data: e.range.data,
          fulldate: e.fulldate
        };
        this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, obj);
      },
      rightChange(e) {
        const {
          before,
          after
        } = e.range;
        this.rangeChange(before, after);
        const obj = {
          before: e.range.before,
          after: e.range.after,
          data: e.range.data,
          fulldate: e.fulldate
        };
        this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, obj);
      },
      mobileChange(e) {
        if (this.isRange) {
          const {
            before,
            after
          } = e.range;
          if (!before || !after) {
            return;
          }
          this.handleStartAndEnd(before, after, true);
          if (this.hasTime) {
            const {
              startTime,
              endTime
            } = e.timeRange;
            this.tempRange.startTime = startTime;
            this.tempRange.endTime = endTime;
          }
          this.confirmRangeChange();
        } else {
          this.calendarDate = e.fulldate;
          if (this.hasTime) {
            this.pickerTime = e.time;
            this.displayValue = e.fulldate + " " + e.time;
          } else {
            this.displayValue = e.fulldate;
          }
          this.setEmit(this.displayValue);
        }
        this.$refs.mobile.close();
      },
      rangeChange(before, after) {
        if (!(before && after))
          return;
        this.handleStartAndEnd(before, after, true);
        if (this.hasTime)
          return;
        this.confirmRangeChange();
      },
      confirmRangeChange() {
        if (!this.tempRange.startDate || !this.tempRange.endDate) {
          this.pickerVisible = false;
          return;
        }
        if (!checkDate(this.tempRange.startDate)) {
          this.tempRange.startDate = getDate(Date.now());
        }
        if (!checkDate(this.tempRange.endDate)) {
          this.tempRange.endDate = getDate(Date.now());
        }
        let start, end;
        let startDateLaterRangeStartDate = false;
        let startDateLaterRangeEndDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(this.start, this.tempRange.startDate)) {
            startDateLaterRangeStartDate = true;
            this.tempRange.startDate = startDate;
          }
          if (this.start && !dateCompare(this.start, this.tempRange.endDate)) {
            startDateLaterRangeEndDate = true;
            this.tempRange.endDate = startDate;
          }
        }
        let endDateEarlierRangeStartDate = false;
        let endDateEarlierRangeEndDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.tempRange.startDate, this.end)) {
            endDateEarlierRangeStartDate = true;
            this.tempRange.startDate = endDate;
          }
          if (this.end && !dateCompare(this.tempRange.endDate, this.end)) {
            endDateEarlierRangeEndDate = true;
            this.tempRange.endDate = endDate;
          }
        }
        if (!this.hasTime) {
          start = this.displayRangeValue.startDate = this.tempRange.startDate;
          end = this.displayRangeValue.endDate = this.tempRange.endDate;
        } else {
          if (startDateLaterRangeStartDate) {
            this.tempRange.startTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeStartDate) {
            this.tempRange.startTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.startTime) {
            this.tempRange.startTime = getTime(Date.now(), this.hideSecond);
          }
          if (startDateLaterRangeEndDate) {
            this.tempRange.endTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeEndDate) {
            this.tempRange.endTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.endTime) {
            this.tempRange.endTime = getTime(Date.now(), this.hideSecond);
          }
          start = this.displayRangeValue.startDate = `${this.tempRange.startDate} ${this.tempRange.startTime}`;
          end = this.displayRangeValue.endDate = `${this.tempRange.endDate} ${this.tempRange.endTime}`;
        }
        if (!dateCompare(start, end)) {
          [start, end] = [end, start];
        }
        this.displayRangeValue.startDate = start;
        this.displayRangeValue.endDate = end;
        const displayRange = [start, end];
        this.setEmit(displayRange);
        this.pickerVisible = false;
      },
      handleStartAndEnd(before, after, temp = false) {
        if (!(before && after))
          return;
        const type = temp ? "tempRange" : "range";
        const isStartEarlierEnd = dateCompare(before, after);
        this[type].startDate = isStartEarlierEnd ? before : after;
        this[type].endDate = isStartEarlierEnd ? after : before;
      },
      /**
       * 比较时间大小
       */
      dateCompare(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        return startDate <= endDate;
      },
      /**
       * 比较时间差
       */
      diffDate(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        const diff = (endDate - startDate) / (24 * 60 * 60 * 1e3);
        return Math.abs(diff);
      },
      clear(needEmit = true) {
        if (!this.isRange) {
          this.displayValue = "";
          this.inputDate = "";
          this.pickerTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.pcSingle && this.$refs.pcSingle.clearCalender();
          }
          if (needEmit) {
            this.$emit("change", "");
            this.$emit("input", "");
            this.$emit("update:modelValue", "");
          }
        } else {
          this.displayRangeValue.startDate = "";
          this.displayRangeValue.endDate = "";
          this.tempRange.startDate = "";
          this.tempRange.startTime = "";
          this.tempRange.endDate = "";
          this.tempRange.endTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.left && this.$refs.left.clearCalender();
            this.$refs.right && this.$refs.right.clearCalender();
            this.$refs.right && this.$refs.right.changeMonth("next");
          }
          if (needEmit) {
            this.$emit("change", []);
            this.$emit("input", []);
            this.$emit("update:modelValue", []);
          }
        }
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_Calendar = vue.resolveComponent("Calendar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-date" }, [
      vue.createElementVNode("view", {
        class: "uni-date-editor",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.show && $options.show(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-date-editor--x", { "uni-date-editor--x__disabled": $props.disabled, "uni-date-x--border": $props.border }])
            },
            [
              !$data.isRange ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-x uni-date-single"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input" },
                  vue.toDisplayString($data.displayValue || $options.singlePlaceholderText),
                  1
                  /* TEXT */
                )
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-date-x uni-date-range"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.startDate || $options.startPlaceholderText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "range-separator" },
                  vue.toDisplayString($props.rangeSeparator),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.endDate || $options.endPlaceholderText),
                  1
                  /* TEXT */
                )
              ])),
              $options.showClearIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "uni-date__icon-clear",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.clear && $options.clear(...args), ["stop"]))
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "clear",
                  color: "#c0c4cc",
                  size: "22"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        {
          class: "uni-date-mask--pc",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args))
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.pickerVisible]
      ]),
      !$data.isPhone ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          ref: "datePicker",
          class: "uni-date-picker__container"
        },
        [
          !$data.isRange ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "uni-date-single--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-changed popup-x-header"
              }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__input text-center",
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.inputDate = $event),
                  placeholder: $options.selectDateText
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.inputDate]
                ]),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  modelValue: $data.pickerTime,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.pickerTime = $event),
                  border: false,
                  disabled: !$data.inputDate,
                  start: $options.timepickerStartTime,
                  end: $options.timepickerEndTime,
                  hideSecond: $props.hideSecond,
                  style: { "width": "100%" }
                }, {
                  default: vue.withCtx(() => [
                    vue.withDirectives(vue.createElementVNode("input", {
                      class: "uni-date__input text-center",
                      type: "text",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.pickerTime = $event),
                      placeholder: $options.selectTimeText,
                      disabled: !$data.inputDate
                    }, null, 8, ["placeholder", "disabled"]), [
                      [vue.vModelText, $data.pickerTime]
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "disabled", "start", "end", "hideSecond"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_Calendar, {
                ref: "pcSingle",
                showMonth: false,
                "start-date": $data.calendarRange.startDate,
                "end-date": $data.calendarRange.endDate,
                date: $data.calendarDate,
                onChange: $options.singleChange,
                "default-value": $props.defaultValue,
                style: { "padding": "0 8px" }
              }, null, 8, ["start-date", "end-date", "date", "onChange", "default-value"]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.confirmSingleChange && $options.confirmSingleChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "uni-date-range--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "popup-x-header uni-date-changed"
              }, [
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.tempRange.startDate = $event),
                    placeholder: $options.startDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.startDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.startTime,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.tempRange.startTime = $event),
                    start: $options.timepickerStartTime,
                    border: false,
                    disabled: !$data.tempRange.startDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.tempRange.startTime = $event),
                        placeholder: $options.startTimeText,
                        disabled: !$data.tempRange.startDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.startTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "start", "disabled", "hideSecond"])
                ]),
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999",
                  style: { "line-height": "40px" }
                }),
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.tempRange.endDate = $event),
                    placeholder: $options.endDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.endDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.endTime,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.tempRange.endTime = $event),
                    end: $options.timepickerEndTime,
                    border: false,
                    disabled: !$data.tempRange.endDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.tempRange.endTime = $event),
                        placeholder: $options.endTimeText,
                        disabled: !$data.tempRange.endDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.endTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "end", "disabled", "hideSecond"])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "popup-x-body" }, [
                vue.createVNode(_component_Calendar, {
                  ref: "left",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  pleStatus: $data.endMultipleStatus,
                  onChange: $options.leftChange,
                  onFirstEnterCale: $options.updateRightCale,
                  style: { "padding": "0 8px" }
                }, null, 8, ["start-date", "end-date", "pleStatus", "onChange", "onFirstEnterCale"]),
                vue.createVNode(_component_Calendar, {
                  ref: "right",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  onChange: $options.rightChange,
                  pleStatus: $data.startMultipleStatus,
                  onFirstEnterCale: $options.updateLeftCale,
                  style: { "padding": "0 8px", "border-left": "1px solid #F1F1F1" }
                }, null, 8, ["start-date", "end-date", "onChange", "pleStatus", "onFirstEnterCale"])
              ]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    onClick: _cache[13] || (_cache[13] = (...args) => $options.clear && $options.clear(...args))
                  },
                  vue.toDisplayString($options.clearText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[14] || (_cache[14] = (...args) => $options.confirmRangeChange && $options.confirmRangeChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ))
        ],
        512
        /* NEED_PATCH */
      )), [
        [vue.vShow, $data.pickerVisible]
      ]) : vue.createCommentVNode("v-if", true),
      $data.isPhone ? (vue.openBlock(), vue.createBlock(_component_Calendar, {
        key: 1,
        ref: "mobile",
        clearDate: false,
        date: $data.calendarDate,
        defTime: $options.mobileCalendarTime,
        "start-date": $data.calendarRange.startDate,
        "end-date": $data.calendarRange.endDate,
        selectableTimes: $options.mobSelectableTime,
        startPlaceholder: $props.startPlaceholder,
        endPlaceholder: $props.endPlaceholder,
        "default-value": $props.defaultValue,
        pleStatus: $data.endMultipleStatus,
        showMonth: false,
        range: $data.isRange,
        hasTime: $data.hasTime,
        insert: false,
        hideSecond: $props.hideSecond,
        onConfirm: $options.mobileChange,
        onMaskClose: $options.close
      }, null, 8, ["date", "defTime", "start-date", "end-date", "selectableTimes", "startPlaceholder", "endPlaceholder", "default-value", "pleStatus", "range", "hasTime", "hideSecond", "onConfirm", "onMaskClose"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-9802168a"], ["__file", "D:/uni_app/vbot-todo-android-2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"]]);
  const formatRelativeTime = (timestamp) => {
    if (!timestamp)
      return "";
    const now2 = Date.now();
    const diff = now2 - timestamp;
    if (diff < 6e4)
      return "Vừa xong";
    if (diff < 36e5) {
      const minutes = Math.floor(diff / 6e4);
      return `${minutes} phút trước`;
    }
    if (diff < 864e5) {
      const hours = Math.floor(diff / 36e5);
      return `${hours} giờ trước`;
    }
    const date = new Date(timestamp);
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    const h = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    return `${d}/${m}/${y} ${h}:${min}`;
  };
  const formatDateDisplay = (dateStr) => {
    if (!dateStr)
      return "";
    try {
      if (dateStr.includes("-")) {
        const parts = dateStr.split("-");
        if (parts.length === 3) {
          const [year, month, day] = parts;
          return `${day}/${month}/${year}`;
        }
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };
  const parseSafeDate = (dateStr) => {
    if (!dateStr)
      return null;
    const safeStr = dateStr.replace(/-/g, "/");
    const d = new Date(safeStr);
    return isNaN(d.getTime()) ? null : d;
  };
  const getStartOfDay = (dateStr) => {
    const d = parseSafeDate(dateStr);
    if (!d)
      return -1;
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  const getStartOfNextDay = (dateStr) => {
    const d = parseSafeDate(dateStr);
    if (!d)
      return -1;
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  const convertDateRangeToValue = (startDate, endDate) => {
    if (!startDate && !endDate)
      return "";
    const startTs = getStartOfDay(startDate);
    const endTs = getStartOfNextDay(endDate);
    if (startTs === -1 && endTs === -1)
      return "";
    const s = startTs === -1 ? "" : startTs;
    const e = endTs === -1 ? "" : endTs;
    return `${s}|${e}`;
  };
  /*!
    * @intlify/shared v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  let mark;
  let measure;
  {
    const perf2 = inBrowser && window.performance;
    if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
      mark = (tag) => perf2.mark(tag);
      measure = (name, startTag, endTag) => {
        perf2.measure(name, startTag, endTag);
        perf2.clearMarks(startTag);
        perf2.clearMarks(endTag);
      };
    }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
    if (args.length === 1 && isObject$1(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale, key, source2) => friendlyJSONstringify({ l: locale, k: key, s: source2 });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject$1(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign$2 = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isObject$1 = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray(val) || isPlainObject$1(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source2, start = 0, end = source2.length) {
    const lines = source2.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  /*!
    * @intlify/message-resolver v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isObject = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const pathStateMachine = [];
  pathStateMachine[
    0
    /* BEFORE_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      0
      /* BEFORE_PATH */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    1
    /* IN_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      1
      /* IN_PATH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    2
    /* BEFORE_IDENT */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    3
    /* IN_IDENT */
  ] = {
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "w"
      /* WORKSPACE */
    ]: [
      1,
      1
      /* PUSH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2,
      1
      /* PUSH */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      1
      /* PUSH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7,
      1
      /* PUSH */
    ]
  };
  pathStateMachine[
    4
    /* IN_SUB_PATH */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      5,
      0
      /* APPEND */
    ],
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      6,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      2
      /* INC_SUB_PATH_DEPTH */
    ],
    [
      "]"
      /* RIGHT_BRACKET */
    ]: [
      1,
      3
      /* PUSH_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      4,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    5
    /* IN_SINGLE_QUOTE */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      5,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    6
    /* IN_DOUBLE_QUOTE */
  ] = {
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      6,
      0
      /* APPEND */
    ]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code = ch.charCodeAt(0);
    switch (code) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return ch;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[
      0
      /* APPEND */
    ] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[
      1
      /* PUSH */
    ] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[
      2
      /* INC_SUB_PATH_DEPTH */
    ] = () => {
      actions[
        0
        /* APPEND */
      ]();
      subPathDepth++;
    };
    actions[
      3
      /* PUSH_SUB_PATH */
    ] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[
          0
          /* APPEND */
        ]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[
            1
            /* PUSH */
          ]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index++;
        newChar = "\\" + nextChar;
        actions[
          0
          /* APPEND */
        ]();
        return true;
      }
    }
    while (mode !== null) {
      index++;
      c = path[index];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap[
        "l"
        /* ELSE */
      ] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  const cache = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const val = last[hit[i]];
      if (val === void 0) {
        return null;
      }
      last = val;
      i++;
    }
    return last;
  }
  function handleFlatJson(obj) {
    if (!isObject(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      if (!key.includes(
        "."
        /* DOT */
      )) {
        if (isObject(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(
          "."
          /* DOT */
        );
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        for (let i = 0; i < lastIndex; i++) {
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = {};
          }
          currentObj = currentObj[subKeys[i]];
        }
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
        if (isObject(currentObj[subKeys[lastIndex]])) {
          handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
      }
    }
    return obj;
  }
  /*!
    * @intlify/runtime v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
  }
  function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
      props.count = pluralIndex;
    }
    if (!props.n) {
      props.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject$1(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject$1(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject$1(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      [
        "list"
        /* LIST */
      ]: list,
      [
        "named"
        /* NAMED */
      ]: named,
      [
        "plural"
        /* PLURAL */
      ]: plural,
      [
        "linked"
        /* LINKED */
      ]: (key, modifier) => {
        const msg = message(key)(ctx);
        return isString(modifier) ? _modifier(modifier)(msg) : msg;
      },
      [
        "message"
        /* MESSAGE */
      ]: message,
      [
        "type"
        /* TYPE */
      ]: type,
      [
        "interpolate"
        /* INTERPOLATE */
      ]: interpolate,
      [
        "normalize"
        /* NORMALIZE */
      ]: normalize
    };
    return ctx;
  }
  /*!
    * @intlify/message-compiler v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const errorMessages$2 = {
    // tokenizer error messages
    [
      0
      /* EXPECTED_TOKEN */
    ]: `Expected token: '{0}'`,
    [
      1
      /* INVALID_TOKEN_IN_PLACEHOLDER */
    ]: `Invalid token in placeholder: '{0}'`,
    [
      2
      /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */
    ]: `Unterminated single quote in placeholder`,
    [
      3
      /* UNKNOWN_ESCAPE_SEQUENCE */
    ]: `Unknown escape sequence: \\{0}`,
    [
      4
      /* INVALID_UNICODE_ESCAPE_SEQUENCE */
    ]: `Invalid unicode escape sequence: {0}`,
    [
      5
      /* UNBALANCED_CLOSING_BRACE */
    ]: `Unbalanced closing brace`,
    [
      6
      /* UNTERMINATED_CLOSING_BRACE */
    ]: `Unterminated closing brace`,
    [
      7
      /* EMPTY_PLACEHOLDER */
    ]: `Empty placeholder`,
    [
      8
      /* NOT_ALLOW_NEST_PLACEHOLDER */
    ]: `Not allowed nest placeholder`,
    [
      9
      /* INVALID_LINKED_FORMAT */
    ]: `Invalid linked format`,
    // parser error messages
    [
      10
      /* MUST_HAVE_MESSAGES_IN_PLURAL */
    ]: `Plural must have messages`,
    [
      11
      /* UNEXPECTED_EMPTY_LINKED_MODIFIER */
    ]: `Unexpected empty linked modifier`,
    [
      12
      /* UNEXPECTED_EMPTY_LINKED_KEY */
    ]: `Unexpected empty linked key`,
    [
      13
      /* UNEXPECTED_LEXICAL_ANALYSIS */
    ]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
      error.location = loc;
    }
    error.domain = domain;
    return error;
  }
  /*!
    * @intlify/devtools-if v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  /*!
    * @intlify/core-base v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n2, version, meta) {
    devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n: i18n2,
      version,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const warnMessages$1 = {
    [
      0
      /* NOT_FOUND_KEY */
    ]: `Not found '{key}' key in '{locale}' locale messages.`,
    [
      1
      /* FALLBACK_TO_TRANSLATE */
    ]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [
      2
      /* CANNOT_FORMAT_NUMBER */
    ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [
      3
      /* FALLBACK_TO_NUMBER_FORMAT */
    ]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [
      4
      /* CANNOT_FORMAT_DATE */
    ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [
      5
      /* FALLBACK_TO_DATE_FORMAT */
    ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code, ...args) {
    return format(warnMessages$1[code], ...args);
  }
  const VERSION$1 = "9.1.9";
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val) => isString(val) ? val.toUpperCase() : val,
      lower: (val) => isString(val) ? val.toLowerCase() : val,
      // prettier-ignore
      capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
  }
  let _compiler;
  let _additionalMeta = null;
  const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = () => _additionalMeta;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const version = isString(options.version) ? options.version : VERSION$1;
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const messages = isPlainObject$1(options.messages) ? options.messages : { [locale]: {} };
    const datetimeFormats = isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
    const numberFormats = isPlainObject$1(options.numberFormats) ? options.numberFormats : { [locale]: {} };
    const modifiers = assign$2({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject$1(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    const internalOptions = options;
    const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version,
      cid: _cid,
      locale,
      fallbackLocale,
      messages,
      datetimeFormats,
      numberFormats,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      onWarn,
      __datetimeFormatters,
      __numberFormatters,
      __meta
    };
    {
      context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
    }
    {
      initI18nDevTools(context, version, __meta);
    }
    return context;
  }
  function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("missing", {
          locale,
          key,
          type,
          groupId: `${type}:${key}`
        });
      }
    }
    if (missing !== null) {
      const ret = missing(context, locale, key, type);
      return isString(ret) ? ret : key;
    } else {
      if (isTranslateMissingWarn(missingWarn, key)) {
        onWarn(getWarnMessage$1(0, { key, locale }));
      }
      return key;
    }
  }
  function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults = isArray(fallback) ? fallback : isPlainObject$1(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
      block = isString(defaults) ? [defaults] : defaults;
      if (isArray(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
      const locale = block[i];
      if (isString(locale)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale = target.replace(/!/g, "");
        chain.push(locale);
        if ((isArray(blocks) || isPlainObject$1(blocks)) && blocks[locale]) {
          follow = blocks[locale];
        }
      }
    }
    return follow;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    getLocaleChain(ctx, fallback, locale);
  }
  function createCoreError(code) {
    return createCompileError(code, null, { messages: errorMessages$1 });
  }
  const errorMessages$1 = {
    [
      14
      /* INVALID_ARGUMENT */
    ]: "Invalid arguments",
    [
      15
      /* INVALID_DATE_ARGUMENT */
    ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [
      16
      /* INVALID_ISO_DATE_ARGUMENT */
    ]: "The argument provided is not a valid ISO date string"
  };
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale = isString(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages[locale] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString(format2) && context.messageCompiler == null) {
      warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
      return key;
    }
    let occurred = false;
    const errorDetector = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
      const payloads = {
        timestamp: Date.now(),
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign$2({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray(options.list)) {
      options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
    } else if (isObject$1(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(1, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      message = messages[targetLocale] || {};
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
        start = window.performance.now();
        startTag = "intlify-message-resolve-start";
        endTag = "intlify-message-resolve-end";
        mark && mark(startTag);
      }
      if ((format2 = resolveValue(message, key)) === null) {
        format2 = message[key];
      }
      if (inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start && format2) {
          emitter.emit("message-resolve", {
            type: "message-resolve",
            key,
            message: format2,
            time: end - start,
            groupId: `${type}:${key}`
          });
        }
        if (startTag && endTag && mark && measure) {
          mark(endTag);
          measure("intlify message resolve", startTag, endTag);
        }
      }
      if (isString(format2) || isFunction(format2))
        break;
      const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
      if (missingRet !== key) {
        format2 = missingRet;
      }
      from = to;
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-compilation-start";
      endTag = "intlify-message-compilation-end";
      mark && mark(startTag);
    }
    const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-compilation", {
          type: "message-compilation",
          message: format2,
          time: end - start,
          groupId: `${"translate"}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message compilation", startTag, endTag);
      }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-evaluation-start";
      endTag = "intlify-message-evaluation-end";
      mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-evaluation", {
          type: "message-evaluation",
          value: messaged,
          time: end - start,
          groupId: `${"translate"}:${msg.key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message evaluation", startTag, endTag);
      }
    }
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber(arg2)) {
      options.plural = arg2;
    } else if (isString(arg2)) {
      options.default = arg2;
    } else if (isPlainObject$1(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray(arg2)) {
      options.list = arg2;
    }
    if (isNumber(arg3)) {
      options.plural = arg3;
    } else if (isString(arg3)) {
      options.default = arg3;
    } else if (isPlainObject$1(arg3)) {
      assign$2(options, arg3);
    }
    return [key, options];
  }
  function getCompileOptions(context, locale, key, source2, warnHtmlMessage, errorDetector) {
    return {
      warnHtmlMessage,
      onError: (err) => {
        errorDetector && errorDetector(err);
        {
          const message = `Message compilation error: ${err.message}`;
          const codeFrame = err.location && generateCodeFrame(source2, err.location.start.offset, err.location.end.offset);
          const emitter = context.__v_emitter;
          if (emitter) {
            emitter.emit("compile-error", {
              message: source2,
              error: err.message,
              start: err.location && err.location.start.offset,
              end: err.location && err.location.end.offset,
              groupId: `${"translate"}:${key}`
            });
          }
          console.error(codeFrame ? `${message}
${codeFrame}` : message);
        }
      },
      onCacheKey: (source22) => generateFormatCacheKey(locale, key, source22)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
      const val = resolveValue(message, key);
      if (isString(val)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  const intlDefined = typeof Intl !== "undefined";
  const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
    numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
  };
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (!Availabilities.dateTimeFormat) {
      onWarn(getWarnMessage$1(
        4
        /* CANNOT_FORMAT_DATE */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.DateTimeFormat(locale).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(5, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject$1(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject$1(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign$2({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (isString(arg1)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
      value = new Date(arg1);
      try {
        value.toISOString();
      } catch (e) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(
          15
          /* INVALID_DATE_ARGUMENT */
        );
      }
      value = arg1;
    } else if (isNumber(arg1)) {
      value = arg1;
    } else {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject$1(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject$1(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject$1(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
    }
  }
  function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (!Availabilities.numberFormat) {
      onWarn(getWarnMessage$1(
        2
        /* CANNOT_FORMAT_NUMBER */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.NumberFormat(locale).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(3, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject$1(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject$1(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign$2({}, format2, overrides));
      __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!isNumber(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const value = arg1;
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject$1(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject$1(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject$1(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
  }
  function getDevtoolsGlobalHook$1() {
    return getTarget$1().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget$1() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable$1 = typeof Proxy === "function";
  const HOOK_SETUP$1 = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET$1 = "plugin:settings:set";
  let ApiProxy$1 = class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET$1, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  };
  function setupDevtoolsPlugin$1(pluginDescriptor, setupFn) {
    const target = getTarget$1();
    const hook = getDevtoolsGlobalHook$1();
    const enableProxy = isProxyAvailable$1 && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP$1, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy$1(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * @intlify/vue-devtools v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VueDevToolsLabels = {
    [
      "vue-devtools-plugin-vue-i18n"
      /* PLUGIN */
    ]: "Vue I18n devtools",
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "I18n Resources",
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: "Vue I18n"
  };
  const VueDevToolsPlaceholders = {
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "Search for scopes ..."
  };
  const VueDevToolsTimelineColors = {
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: 16764185
  };
  /*!
    * vue-i18n v9.1.9
    * (c) 2022 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  const warnMessages = {
    [
      6
      /* FALLBACK_TO_ROOT */
    ]: `Fall back to {type} '{key}' with root locale.`,
    [
      7
      /* NOT_SUPPORTED_PRESERVE */
    ]: `Not supported 'preserve'.`,
    [
      8
      /* NOT_SUPPORTED_FORMATTER */
    ]: `Not supported 'formatter'.`,
    [
      9
      /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
    ]: `Not supported 'preserveDirectiveContent'.`,
    [
      10
      /* NOT_SUPPORTED_GET_CHOICE_INDEX */
    ]: `Not supported 'getChoiceIndex'.`,
    [
      11
      /* COMPONENT_NAME_LEGACY_COMPATIBLE */
    ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [
      12
      /* NOT_FOUND_PARENT_SCOPE */
    ]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code, ...args) {
    return format(warnMessages[code], ...args);
  }
  function createI18nError(code, ...args) {
    return createCompileError(code, null, { messages: errorMessages, args });
  }
  const errorMessages = {
    [
      14
      /* UNEXPECTED_RETURN_TYPE */
    ]: "Unexpected return type in composer",
    [
      15
      /* INVALID_ARGUMENT */
    ]: "Invalid argument",
    [
      16
      /* MUST_BE_CALL_SETUP_TOP */
    ]: "Must be called at the top of a `setup` function",
    [
      17
      /* NOT_INSLALLED */
    ]: "Need to install with `app.use` function",
    [
      22
      /* UNEXPECTED_ERROR */
    ]: "Unexpected error",
    [
      18
      /* NOT_AVAILABLE_IN_LEGACY_MODE */
    ]: "Not available in legacy mode",
    [
      19
      /* REQUIRED_VALUE */
    ]: `Required in value: {0}`,
    [
      20
      /* INVALID_VALUE */
    ]: `Invalid value`,
    [
      21
      /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
    ]: `Cannot setup vue-devtools plugin`
  };
  const DEVTOOLS_META = "__INTLIFY_META__";
  const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  const DatetimePartsSymbol = makeSymbol("__datetimeParts");
  const NumberPartsSymbol = makeSymbol("__numberParts");
  const EnableEmitter = makeSymbol("__enableEmitter");
  const DisableEmitter = makeSymbol("__disableEmitter");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  const InejctWithOption = makeSymbol("__injectWithOption");
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => {
      return missing(locale, key, vue.getCurrentInstance() || void 0, type);
    };
  }
  function getLocaleMessages(locale, options) {
    const { messages, __i18n } = options;
    const ret = isPlainObject$1(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
    if (isArray(__i18n)) {
      __i18n.forEach(({ locale: locale2, resource }) => {
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      });
    }
    if (options.flatJson) {
      for (const key in ret) {
        if (hasOwn$1(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
    for (const key in src) {
      if (hasOwn$1(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
          des[key] = src[key];
        } else {
          deepCopy(src[key], des[key]);
        }
      }
    }
  }
  const getMetaInfo = () => {
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US"
    );
    const _fallbackLocale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
    );
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject$1(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject$1(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    function getCoreContext() {
      return createCoreContext({
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        messageCompiler: function compileToFunction(source2) {
          return (ctx) => {
            return ctx.normalize([source2]);
          };
        },
        datetimeFormats: _datetimeFormats.value,
        numberFormats: _numberFormats.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        __datetimeFormatters: isPlainObject$1(_context) ? _context.__datetimeFormatters : void 0,
        __numberFormatters: isPlainObject$1(_context) ? _context.__numberFormatters : void 0,
        __v_emitter: isPlainObject$1(_context) ? _context.__v_emitter : void 0,
        __meta: { framework: "vue" }
      });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale = vue.computed({
      get: () => _locale.value,
      set: (val) => {
        _locale.value = val;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = vue.computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _fallbackLocale.value = val;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages = vue.computed(() => _messages.value);
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    const numberFormats = vue.computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg) {
      return type !== "translate" || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
      trackReactivityValues();
      let ret;
      {
        try {
          setAdditionalMeta(getMetaInfo());
          ret = fn(_context);
        } finally {
          setAdditionalMeta(null);
        }
      }
      if (isNumber(ret) && ret === NOT_REOSLVED) {
        const [key, arg2] = argumentParser();
        if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
          if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
            warn(getWarnMessage(6, {
              key,
              type: warnType
            }));
          }
          {
            const { __v_emitter: emitter } = _context;
            if (emitter && _fallbackRoot) {
              emitter.emit("fallback", {
                type: warnType,
                key,
                to: "global",
                groupId: `${warnType}:${key}`
              });
            }
          }
        }
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(
          14
          /* UNEXPECTED_RETURN_TYPE */
        );
      }
    }
    function t(...args) {
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$1(arg3)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      return t(...[arg1, arg2, assign$2({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function n(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function normalize(values) {
      return values.map((val) => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function transrateVNode(...args) {
      return wrapWithDeps(
        (context) => {
          let ret;
          const _context2 = context;
          try {
            _context2.processor = processor;
            ret = translate(_context2, ...args);
          } finally {
            _context2.processor = null;
          }
          return ret;
        },
        () => parseTranslateArgs(...args),
        "translate",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[TransrateVNodeSymbol](...args),
        (key) => [vue.createVNode(vue.Text, null, key, 0)],
        (val) => isArray(val)
      );
    }
    function numberParts(...args) {
      return wrapWithDeps(
        (context) => number(context, ...args),
        () => parseNumberArgs(...args),
        "number format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[NumberPartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function datetimeParts(...args) {
      return wrapWithDeps(
        (context) => datetime(context, ...args),
        () => parseDateTimeArgs(...args),
        "datetime format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[DatetimePartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      return resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = resolveValue(targetLocaleMessages, key);
        if (messageValue != null) {
          messages2 = messageValue;
          break;
        }
      }
      return messages2;
    }
    function tm(key) {
      const messages2 = resolveMessages(key);
      return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      _messages.value[locale2] = message;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      deepCopy(message, _messages.value[locale2]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign$2(_datetimeFormats.value[locale2] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign$2(_numberFormats.value[locale2] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    composerID++;
    if (__root) {
      vue.watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      vue.watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages,
      datetimeFormats,
      numberFormats,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t,
      rt,
      d,
      n,
      te,
      tm,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getDateTimeFormat,
      setDateTimeFormat,
      mergeDateTimeFormat,
      getNumberFormat,
      setNumberFormat,
      mergeNumberFormat,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [TransrateVNodeSymbol]: transrateVNode,
      [NumberPartsSymbol]: numberParts,
      [DatetimePartsSymbol]: datetimeParts,
      [SetPluralRulesSymbol]: setPluralRules,
      [InejctWithOption]: options.__injectWithOption
      // eslint-disable-line @typescript-eslint/no-explicit-any
    };
    {
      composer[EnableEmitter] = (emitter) => {
        _context.__v_emitter = emitter;
      };
      composer[DisableEmitter] = () => {
        _context.__v_emitter = void 0;
      };
    }
    return composer;
  }
  function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = isFunction(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject$1(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean(options.sync) ? options.sync : true;
    if (options.formatter) {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
    }
    if (options.preserveDirectiveContent) {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
    }
    let messages = options.messages;
    if (isPlainObject$1(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages = locales.reduce((messages2, locale2) => {
        const message = messages2[locale2] || (messages2[locale2] = {});
        assign$2(message, sharedMessages[locale2]);
        return messages2;
      }, messages || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      // id
      id: composer.id,
      // locale
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      // fallbackLocale
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      // messages
      get messages() {
        return composer.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return composer.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return composer.availableLocales;
      },
      // formatter
      get formatter() {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
      },
      // missing
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      // modifiers
      get modifiers() {
        return composer.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      // postTranslation
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      // sync
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
        return true;
      },
      set preserveDirectiveContent(val) {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
      },
      // pluralizationRules
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      // for internal
      __composer: composer,
      // t
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject$1(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject$1(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      rt(...args) {
        return composer.rt(...args);
      },
      // tc
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject$1(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject$1(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      // te
      te(key, locale) {
        return composer.te(key, locale);
      },
      // tm
      tm(key) {
        return composer.tm(key);
      },
      // getLocaleMessage
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      // setLocaleMessage
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      // d
      d(...args) {
        return composer.d(...args);
      },
      // getDateTimeFormat
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      // setDateTimeFormat
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      // n
      n(...args) {
        return composer.n(...args);
      },
      // getNumberFormat
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      // setNumberFormat
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      // mergeNumberFormat
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(choice, choicesLength) {
        warn(getWarnMessage(
          10
          /* NOT_SUPPORTED_GET_CHOICE_INDEX */
        ));
        return -1;
      },
      // for internal
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    {
      vueI18n.__enableEmitter = (emitter) => {
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
      };
      vueI18n.__disableEmitter = () => {
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
      };
    }
    return vueI18n;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  const Translation = {
    /* eslint-disable */
    name: "i18n-t",
    props: assign$2({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      const keys = Object.keys(slots).filter((key) => key !== "_");
      return () => {
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n2[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign$2({}, attrs);
        return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
      };
    }
  };
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      return slots.default ? slots.default() : [];
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, {});
    }
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString(props.format)) {
        options.key = props.format;
      } else if (isObject$1(props.format)) {
        if (isString(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign$2({}, options2, { [prop]: props.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign$2({}, attrs);
      return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
  }
  const NUMBER_FORMAT_KEYS = [
    "localeMatcher",
    "style",
    "unit",
    "unitDisplay",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "numberingSystem",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "notation",
    "formatMatcher"
  ];
  const NumberFormat = {
    /* eslint-disable */
    name: "i18n-n",
    props: assign$2({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[NumberPartsSymbol](...args)
      ));
    }
  };
  const DATETIME_FORMAT_KEYS = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  const DatetimeFormat = {
    /* eslint-disable */
    name: "i18n-d",
    props: assign$2({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[DatetimePartsSymbol](...args)
      ));
    }
  };
  function getComposer$2(i18n2, instance) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n2.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
    }
  }
  function vTDirective(i18n2) {
    const bind = (el, { instance, value, modifiers }) => {
      if (!instance || !instance.$) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const composer = getComposer$2(i18n2, instance.$);
      if (modifiers.preserve) {
        warn(getWarnMessage(
          7
          /* NOT_SUPPORTED_PRESERVE */
        ));
      }
      const parsedValue = parseValue(value);
      el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
      beforeMount: bind,
      beforeUpdate: bind
    };
  }
  function parseValue(value) {
    if (isString(value)) {
      return { path: value };
    } else if (isPlainObject$1(value)) {
      if (!("path" in value)) {
        throw createI18nError(19, "path");
      }
      return value;
    } else {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
  }
  function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString(locale)) {
      options.locale = locale;
    }
    if (isNumber(choice)) {
      options.plural = choice;
    }
    if (isNumber(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app, i18n2, ...options) {
    const pluginOptions = isPlainObject$1(options[0]) ? options[0] : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) {
      warn(getWarnMessage(11, {
        name: Translation.name
      }));
    }
    if (globalInstall) {
      app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
      app.component(NumberFormat.name, NumberFormat);
      app.component(DatetimeFormat.name, DatetimeFormat);
    }
    app.directive("t", vTDirective(i18n2));
  }
  const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
  let devtoolsApi;
  async function enableDevTools(app, i18n2) {
    return new Promise((resolve, reject) => {
      try {
        setupDevtoolsPlugin$1({
          id: "vue-devtools-plugin-vue-i18n",
          label: VueDevToolsLabels[
            "vue-devtools-plugin-vue-i18n"
            /* PLUGIN */
          ],
          packageName: "vue-i18n",
          homepage: "https://vue-i18n.intlify.dev",
          logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app
        }, (api) => {
          devtoolsApi = api;
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n2);
          });
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
              if (i18n2.mode === "legacy") {
                if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              } else {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            }
          });
          api.addInspector({
            id: "vue-i18n-resource-inspector",
            label: VueDevToolsLabels[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ],
            icon: "language",
            treeFilterPlaceholder: VueDevToolsPlaceholders[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ]
          });
          api.on.getInspectorTree((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              registerScope(payload, i18n2);
            }
          });
          api.on.getInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              inspectScope(payload, i18n2);
            }
          });
          api.on.editInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              editScope(payload, i18n2);
            }
          });
          api.addTimelineLayer({
            id: "vue-i18n-timeline",
            label: VueDevToolsLabels[
              "vue-i18n-timeline"
              /* TIMELINE */
            ],
            color: VueDevToolsTimelineColors[
              "vue-i18n-timeline"
              /* TIMELINE */
            ]
          });
          resolve(true);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }
  function updateComponentTreeTags(instance, treeNode, i18n2) {
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    if (instance && instance.vnode.el.__VUE_I18N__) {
      if (instance.vnode.el.__VUE_I18N__ !== global2) {
        const label = instance.type.name || instance.type.displayName || instance.type.__file;
        const tag = {
          label: `i18n (${label} Scope)`,
          textColor: 0,
          backgroundColor: 16764185
        };
        treeNode.tags.push(tag);
      }
    }
  }
  function inspectComposer(instanceData, composer) {
    const type = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
      type,
      key: "locale",
      editable: true,
      value: composer.locale.value
    });
    instanceData.state.push({
      type,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    });
    instanceData.state.push({
      type,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    });
    instanceData.state.push({
      type,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    });
    instanceData.state.push({
      type,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    });
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
  function getLocaleMessageValue(messages) {
    const value = {};
    Object.keys(messages).forEach((key) => {
      const v = messages[key];
      if (isFunction(v) && "source" in v) {
        value[key] = getMessageFunctionDetails(v);
      } else if (isObject$1(v)) {
        value[key] = getLocaleMessageValue(v);
      } else {
        value[key] = v;
      }
    });
    return value;
  }
  const ESC = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
  };
  function escape(s) {
    return s.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a) {
    return ESC[a] || a;
  }
  function getMessageFunctionDetails(func) {
    const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
    return {
      _custom: {
        type: "function",
        display: `<span>ƒ</span> ${argString}`
      }
    };
  }
  function registerScope(payload, i18n2) {
    payload.rootNodes.push({
      id: "global",
      label: "Global Scope"
    });
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    for (const [keyInstance, instance] of i18n2.__instances) {
      const composer = i18n2.mode === "composition" ? instance : instance.__composer;
      if (global2 === composer) {
        continue;
      }
      const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
      payload.rootNodes.push({
        id: composer.id.toString(),
        label: `${label} Scope`
      });
    }
  }
  function getComposer$1(nodeId, i18n2) {
    if (nodeId === "global") {
      return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    } else {
      const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
      if (instance) {
        return i18n2.mode === "composition" ? instance : instance.__composer;
      } else {
        return null;
      }
    }
  }
  function inspectScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      payload.state = makeScopeInspectState(composer);
    }
  }
  function makeScopeInspectState(composer) {
    const state = {};
    const localeType = "Locale related info";
    const localeStates = [
      {
        type: localeType,
        key: "locale",
        editable: true,
        value: composer.locale.value
      },
      {
        type: localeType,
        key: "fallbackLocale",
        editable: true,
        value: composer.fallbackLocale.value
      },
      {
        type: localeType,
        key: "availableLocales",
        editable: false,
        value: composer.availableLocales
      },
      {
        type: localeType,
        key: "inheritLocale",
        editable: true,
        value: composer.inheritLocale
      }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = "Locale messages info";
    const localeMessagesStates = [
      {
        type: localeMessagesType,
        key: "messages",
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
      }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
  }
  function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
      let groupId;
      if (payload && "groupId" in payload) {
        groupId = payload.groupId;
        delete payload.groupId;
      }
      devtoolsApi.addTimelineEvent({
        layerId: "vue-i18n-timeline",
        event: {
          title: event,
          groupId,
          time: Date.now(),
          meta: {},
          data: payload || {},
          logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
        }
      });
    }
  }
  function editScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      const [field] = payload.path;
      if (field === "locale" && isString(payload.state.value)) {
        composer.locale.value = payload.state.value;
      } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
        composer.fallbackLocale.value = payload.state.value;
      } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
        composer.inheritLocale = payload.state.value;
      }
    }
  }
  function defineMixin(vuei18n, composer, i18n2) {
    return {
      beforeCreate() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            this.$i18n = createVueI18n(optionsI18n);
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __root: composer
            });
          }
        } else {
          this.$i18n = vuei18n;
        }
        vuei18n.__onComponentInstanceCreated(this.$i18n);
        i18n2.__setInstance(instance, this.$i18n);
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$tc = (...args) => this.$i18n.tc(...args);
        this.$te = (key, locale) => this.$i18n.te(key, locale);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
      },
      mounted() {
        {
          this.$el.__VUE_I18N__ = this.$i18n.__composer;
          const emitter = this.__v_emitter = createEmitter();
          const _vueI18n = this.$i18n;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          emitter.on("*", addTimelineEvent);
        }
      },
      beforeUnmount() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        {
          if (this.__v_emitter) {
            this.__v_emitter.off("*", addTimelineEvent);
            delete this.__v_emitter;
          }
          const _vueI18n = this.$i18n;
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
        delete this.$t;
        delete this.$rt;
        delete this.$tc;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        i18n2.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages = getLocaleMessages(root.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages).forEach((locale) => root.mergeLocaleMessage(locale, messages[locale]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return root;
  }
  function createI18n(options = {}) {
    const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = /* @__PURE__ */ new Map();
    const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
    const symbol = makeSymbol("vue-i18n");
    const i18n2 = {
      // mode
      get mode() {
        return __legacyMode ? "legacy" : "composition";
      },
      // install plugin
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        if (__legacyMode) {
          app.mixin(defineMixin(__global, __global.__composer, i18n2));
        }
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(
              21
              /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
            );
          }
          const emitter = createEmitter();
          if (__legacyMode) {
            const _vueI18n = __global;
            _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          } else {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      // global accessor
      get global() {
        return __global;
      },
      // @internal
      __instances,
      // @internal
      __getInstance(component) {
        return __instances.get(component) || null;
      },
      // @internal
      __setInstance(component, instance) {
        __instances.set(component, instance);
      },
      // @internal
      __deleteInstance(component) {
        __instances.delete(component);
      }
    };
    return i18n2;
  }
  function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
      throw createI18nError(
        16
        /* MUST_BE_CALL_SETUP_TOP */
      );
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(
        17
        /* NOT_INSLALLED */
      );
    }
    const i18n2 = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n2) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
    if (scope === "global") {
      let messages = isObject$1(options.messages) ? options.messages : {};
      if ("__i18nGlobal" in instance.type) {
        messages = getLocaleMessages(global2.locale.value, {
          messages,
          __i18n: instance.type.__i18nGlobal
        });
      }
      const locales = Object.keys(messages);
      if (locales.length) {
        locales.forEach((locale) => {
          global2.mergeLocaleMessage(locale, messages[locale]);
        });
      }
      if (isObject$1(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
          });
        }
      }
      if (isObject$1(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeNumberFormat(locale, options.numberFormats[locale]);
          });
        }
      }
      return global2;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n2, instance, options.__useComponent);
      if (composer2 == null) {
        {
          warn(getWarnMessage(
            12
            /* NOT_FOUND_PARENT_SCOPE */
          ));
        }
        composer2 = global2;
      }
      return composer2;
    }
    if (i18n2.mode === "legacy") {
      throw createI18nError(
        18
        /* NOT_AVAILABLE_IN_LEGACY_MODE */
      );
    }
    const i18nInternal = i18n2;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const type = instance.type;
      const composerOptions = assign$2({}, options);
      if (type.__i18n) {
        composerOptions.__i18n = type.__i18n;
      }
      if (global2) {
        composerOptions.__root = global2;
      }
      composer = createComposer(composerOptions);
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function getComposer(i18n2, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
      const i18nInternal = i18n2;
      if (i18n2.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
        }
        if (useComponent && composer && !composer[InejctWithOption]) {
          composer = null;
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function setupLifeCycle(i18n2, target, composer) {
    let emitter = null;
    vue.onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    vue.onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm"];
  function injectGlobalFields(app, composer) {
    const i18n2 = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const wrap = vue.isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n2, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n2;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "DateRangeFilter",
    props: {
      title: { type: String, required: false },
      startDate: { type: String, required: true },
      endDate: { type: String, required: true }
    },
    emits: ["update:startDate", "update:endDate"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const { locale } = useI18n();
      const props = __props;
      const emit = __emit;
      const onStartChange = (val) => {
        emit("update:startDate", val);
      };
      const onEndChange = (val) => {
        emit("update:endDate", val);
      };
      const __returned__ = { locale, props, emit, onStartChange, onEndChange, get formatDateDisplay() {
        return formatDateDisplay;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "date-filter-block" }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "f-section-title"
        },
        vue.toDisplayString($props.title),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "f-row" }, [
        vue.createElementVNode("view", { class: "f-group half" }, [
          (vue.openBlock(), vue.createBlock(_component_uni_datetime_picker, {
            key: `start-${$setup.locale}`,
            type: "date",
            value: $props.startDate,
            onChange: $setup.onStartChange,
            border: false
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["f-picker date", { "placeholder": !$props.startDate }])
                },
                vue.toDisplayString($props.startDate ? $setup.formatDateDisplay($props.startDate) : _ctx.$t("common.from_date")),
                3
                /* TEXT, CLASS */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["value"]))
        ]),
        vue.createElementVNode("view", { class: "f-group half" }, [
          (vue.openBlock(), vue.createBlock(_component_uni_datetime_picker, {
            key: `end-${$setup.locale}`,
            type: "date",
            value: $props.endDate,
            onChange: $setup.onEndChange,
            border: false
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["f-picker date", { "placeholder": !$props.endDate }])
                },
                vue.toDisplayString($props.endDate ? $setup.formatDateDisplay($props.endDate) : _ctx.$t("common.to_date")),
                3
                /* TEXT, CLASS */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["value"]))
        ])
      ])
    ]);
  }
  const DateRangeFilter = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-645c14d9"], ["__file", "D:/uni_app/vbot-todo-android-2/components/DateRangeFilter.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "CustomerModal",
    props: {
      visible: { type: Boolean, required: true },
      customers: { type: Array, required: true },
      loading: { type: Boolean, required: true },
      managers: { type: Array, required: true },
      loadingMore: { type: Boolean, required: false }
    },
    emits: ["close", "select", "filter", "loadMore"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const { t } = useI18n();
      const props = __props;
      const emit = __emit;
      const isFilterExpanded = vue.ref(false);
      const filter = vue.reactive({
        name: "",
        phone: "",
        managerIndex: 0,
        selectedMemberUID: "",
        startDate: "",
        endDate: ""
      });
      const onScrollToLower = () => {
        formatAppLog("log", "at components/Todo/CustomerModal.vue:110", "Cuộn xuống đáy -> Load more");
        emit("loadMore");
      };
      const managerDisplayOptions = vue.computed(() => {
        const defaultOption = t("customer_modal.manager_default");
        const list = props.managers || [];
        const memberNames = list.map((m) => m.UserName || "Thành viên ẩn danh");
        return [defaultOption, ...memberNames];
      });
      const toggleFilter = () => {
        isFilterExpanded.value = !isFilterExpanded.value;
      };
      const onManagerChange = (e) => {
        const index = parseInt(e.detail.value);
        filter.managerIndex = index;
        if (index === 0) {
          filter.selectedMemberUID = "";
        } else {
          const selectedMember = props.managers[index - 1];
          if (selectedMember) {
            filter.selectedMemberUID = selectedMember.memberUID;
          }
        }
      };
      const resetFilter = () => {
        filter.name = "";
        filter.phone = "";
        filter.managerIndex = 0;
        filter.selectedMemberUID = "";
        filter.startDate = "";
        filter.endDate = "";
        applyFilter();
        formatAppLog("log", "at components/Todo/CustomerModal.vue:147", "Đã đặt lại bộ lọc");
      };
      const applyFilter = () => {
        emit("filter", {
          name: filter.name,
          phone: filter.phone,
          managerUID: filter.selectedMemberUID,
          startDate: filter.startDate,
          endDate: filter.endDate
        });
        isFilterExpanded.value = false;
      };
      const close = () => {
        emit("close");
      };
      const selectCustomer = (item) => {
        emit("select", item);
        close();
      };
      const formatDate = (timestamp) => {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      };
      const __returned__ = { t, props, emit, isFilterExpanded, filter, onScrollToLower, managerDisplayOptions, toggleFilter, onManagerChange, resetFilter, applyFilter, close, selectCustomer, formatDate, UserAvatar, DateRangeFilter };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.visible ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "modal-overlay",
      onClick: vue.withModifiers($setup.close, ["stop"])
    }, [
      vue.createElementVNode("view", {
        class: "modal-content",
        onClick: _cache[4] || (_cache[4] = vue.withModifiers(() => {
        }, ["stop"]))
      }, [
        vue.createElementVNode("view", { class: "modal-header" }, [
          vue.createElementVNode(
            "text",
            { class: "modal-title" },
            vue.toDisplayString(_ctx.$t("customer_modal.title")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "header-actions" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["filter-toggle-btn", { "active": $setup.isFilterExpanded }]),
                onClick: $setup.toggleFilter
              },
              [
                vue.createElementVNode("image", {
                  src: "https://img.icons8.com/ios/50/666666/filter--v1.png",
                  class: "filter-icon-img"
                })
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("text", {
              class: "close-btn",
              onClick: $setup.close
            }, "✕")
          ])
        ]),
        $setup.isFilterExpanded ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "filter-section"
        }, [
          vue.createElementVNode("view", { class: "f-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "f-input",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.filter.name = $event),
              placeholder: _ctx.$t("customer_modal.placeholder_name"),
              "placeholder-class": "ph-style"
            }, null, 8, ["placeholder"]), [
              [vue.vModelText, $setup.filter.name]
            ])
          ]),
          vue.createElementVNode("view", { class: "f-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "f-input",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.filter.phone = $event),
              type: "number",
              placeholder: _ctx.$t("customer_modal.placeholder_phone"),
              "placeholder-class": "ph-style"
            }, null, 8, ["placeholder"]), [
              [vue.vModelText, $setup.filter.phone]
            ])
          ]),
          vue.createElementVNode("view", { class: "f-item" }, [
            vue.createElementVNode("picker", {
              mode: "selector",
              range: $setup.managerDisplayOptions,
              value: $setup.filter.managerIndex,
              onChange: $setup.onManagerChange
            }, [
              vue.createElementVNode("view", { class: "f-picker-box" }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass($setup.filter.managerIndex === 0 ? "text-ph" : "text-val")
                  },
                  vue.toDisplayString($setup.managerDisplayOptions[$setup.filter.managerIndex]),
                  3
                  /* TEXT, CLASS */
                ),
                vue.createElementVNode("text", { class: "arrow" }, "▼")
              ])
            ], 40, ["range", "value"])
          ]),
          vue.createElementVNode("view", { class: "f-item" }, [
            vue.createVNode($setup["DateRangeFilter"], {
              startDate: $setup.filter.startDate,
              endDate: $setup.filter.endDate,
              "onUpdate:startDate": _cache[2] || (_cache[2] = (val) => $setup.filter.startDate = val),
              "onUpdate:endDate": _cache[3] || (_cache[3] = (val) => $setup.filter.endDate = val)
            }, null, 8, ["startDate", "endDate"])
          ]),
          vue.createElementVNode("view", { class: "f-actions" }, [
            vue.createElementVNode(
              "button",
              {
                class: "btn-reset",
                onClick: $setup.resetFilter
              },
              vue.toDisplayString(_ctx.$t("common.reset")),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "button",
              {
                class: "btn-submit",
                onClick: $setup.applyFilter
              },
              vue.toDisplayString(_ctx.$t("common.filter")),
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true),
        $props.loading ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: "loading-state"
          },
          vue.toDisplayString(_ctx.$t("common.loading")),
          1
          /* TEXT */
        )) : (vue.openBlock(), vue.createElementBlock(
          "scroll-view",
          {
            key: 2,
            "scroll-y": "",
            class: "customer-list",
            onScrolltolower: $setup.onScrollToLower,
            "lower-threshold": "50"
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.customers, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.id,
                  class: "customer-item",
                  onClick: ($event) => $setup.selectCustomer(item)
                }, [
                  vue.createVNode($setup["UserAvatar"], {
                    name: item.name,
                    size: 40,
                    class: "mr-3"
                  }, null, 8, ["name"]),
                  vue.createElementVNode("view", { class: "info-column" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name-text" },
                      vue.toDisplayString(item.name || _ctx.$t("customer_modal.no_name")),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "phone-text" },
                      vue.toDisplayString(item.phone || _ctx.$t("customer_modal.no_phone")),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "date-column" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "date-text" },
                      vue.toDisplayString($setup.formatDate(item.createAt)),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $props.loadingMore ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "loading-more-container"
            }, [
              vue.createElementVNode(
                "text",
                { class: "loading-more-text" },
                vue.toDisplayString(_ctx.$t("customer_modal.loading_more")),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $props.customers.length === 0 ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "empty-state"
              },
              vue.toDisplayString(_ctx.$t("common.no_data")),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          32
          /* NEED_HYDRATION */
        ))
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const CustomerModal = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-0c007ba7"], ["__file", "D:/uni_app/vbot-todo-android-2/components/Todo/CustomerModal.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * pinia v2.1.7
   * (c) 2023 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.hasInjectionContext() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      loadStoresState(pinia, JSON.parse(text));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    vue.toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache2[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v) => Object.assign(provideCache, v)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  const TODO_SOURCE = {
    CALL: "CALL",
    CUSTOMER: "CUSTOMER",
    CONVERSATION: "CONVERSATION",
    CHAT_MESSAGE: "CHAT_MESSAGE"
  };
  const SYSTEM_CONFIG = {
    SOURCE_PARAM: "Desktop-RTC",
    MODULE_TYPE: "TODO"
  };
  const DEFAULT_VALUES = {
    STRING: "",
    PLUGIN_TYPE: "",
    GROUP_ID: "",
    TRANS_ID: "",
    ASSIGNEE_ID: "",
    CUSTOMER_CODE: "",
    PHONE_PLACEHOLDER: "072836272322"
  };
  const SERVER_BASE_URL = "https://api-sandbox-h01.vbot.vn/v1.0";
  const AUTH_API_URL = SERVER_BASE_URL;
  const CRM_API_URL = `${SERVER_BASE_URL}/api/module-crm`;
  const PROJECT_API_URL = `${SERVER_BASE_URL}/api/project`;
  const TODO_API_URL = `${SERVER_BASE_URL}/api/module-todo/todo`;
  const PROJECT_CODE = "PR202511211001129372";
  const UID = "87d90802634146e29721476337bce64b";
  const systemLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${AUTH_API_URL}/token`,
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          username,
          password,
          grant_type: "password",
          type_account: 0,
          source: SYSTEM_CONFIG.SOURCE_PARAM
        },
        success: (res) => {
          const data = res.data;
          if (res.statusCode === 200 && data.access_token) {
            resolve(data);
          } else {
            reject(data);
          }
        },
        fail: (err) => reject(err)
      });
    });
  };
  const getTodoToken = (rootToken, projectCode, uid) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${CRM_API_URL}/token`,
        method: "GET",
        data: {
          projectCode,
          uid,
          type: SYSTEM_CONFIG.MODULE_TYPE,
          source: SYSTEM_CONFIG.SOURCE_PARAM
        },
        header: {
          "Authorization": `Bearer ${rootToken}`
        },
        success: (res) => {
          const data = res.data;
          if (data && data.data && data.data.token) {
            resolve(data.data.token);
          } else {
            reject(data);
          }
        },
        fail: (err) => reject(err)
      });
    });
  };
  const getCrmToken = (projectCode, uid) => {
    const authStore = useAuthStore();
    return request({
      url: `${CRM_API_URL}/token`,
      method: "GET",
      data: {
        projectCode,
        uid,
        type: "CRM",
        source: SYSTEM_CONFIG.SOURCE_PARAM
      },
      header: {
        "Authorization": `Bearer ${authStore.rootToken}`
      }
    }).then((data) => data.token);
  };
  const getCrmFieldSearch = (crmToken) => {
    return request({
      url: `${CRM_API_URL}/Customer/getAllFieldSearch`,
      method: "POST",
      data: {},
      header: { "Authorization": `Bearer ${crmToken}` }
    });
  };
  const getCrmCustomers = (crmToken, body) => {
    return request({
      url: `${CRM_API_URL}/Customer/getAll`,
      method: "POST",
      data: body,
      header: { "Authorization": `Bearer ${crmToken}` }
    });
  };
  const getCrmCustomerDetail = (crmToken, customerUid) => {
    return request({
      url: `${CRM_API_URL}/Customer/getDetail`,
      method: "GET",
      data: { uid: customerUid },
      header: { "Authorization": `Bearer ${crmToken}` }
    });
  };
  const getCrmActionTimeline = (crmToken, customerUid, type = "ALL") => {
    return request({
      url: `${CRM_API_URL}/ActionTimeline/getAll?from=-1&to=-1&customerUid=${customerUid}&type=${type}&page=1&size=10&memberUid=&projectCode=`,
      method: "GET",
      header: { "Authorization": `Bearer ${crmToken}` }
    });
  };
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1e3;
  const useAuthStore = defineStore("auth", {
    state: () => ({
      rootToken: uni.getStorageSync("vbot_root_token") || "",
      rootLoginTime: uni.getStorageSync("vbot_root_login_time") || 0,
      todoToken: uni.getStorageSync("todo_access_token") || "",
      crmToken: uni.getStorageSync("crm_access_token") || "",
      uid: uni.getStorageSync("vbot_uid") || "",
      projectCode: uni.getStorageSync("vbot_project_code") || ""
    }),
    getters: {
      isLoggedIn: (state) => !!state.todoToken && !!state.crmToken,
      isRootTokenValid: (state) => {
        if (!state.rootToken || !state.rootLoginTime)
          return false;
        const now2 = Date.now();
        return now2 - state.rootLoginTime < SEVEN_DAYS_MS;
      }
    },
    actions: {
      setAuthData(data) {
        if (data.rootToken) {
          this.rootToken = data.rootToken;
          uni.setStorageSync("vbot_root_token", data.rootToken);
          this.rootLoginTime = Date.now();
          uni.setStorageSync("vbot_root_login_time", this.rootLoginTime);
        }
        if (data.uid) {
          this.uid = data.uid;
          uni.setStorageSync("vbot_uid", data.uid);
        }
        if (data.projectCode) {
          this.projectCode = data.projectCode;
          uni.setStorageSync("vbot_project_code", data.projectCode);
        }
        if (data.todoToken) {
          this.todoToken = data.todoToken;
          uni.setStorageSync("todo_access_token", data.todoToken);
        }
        if (data.crmToken) {
          this.crmToken = data.crmToken;
          uni.setStorageSync("crm_access_token", data.crmToken);
        }
      },
      async fetchModuleTokens() {
        try {
          if (!this.isRootTokenValid) {
            formatAppLog("log", "at stores/auth.ts:61", "Root Token hết hạn, login lại...");
            await this.loginDevMode();
            return;
          }
          formatAppLog("log", "at stores/auth.ts:66", "Store: Đang lấy Token cho Todo và CRM...");
          const [newTodoToken, newCrmToken] = await Promise.all([
            getTodoToken(this.rootToken, this.projectCode, this.uid),
            getCrmToken(this.projectCode, this.uid)
          ]);
          this.setAuthData({
            todoToken: newTodoToken,
            crmToken: newCrmToken
          });
          formatAppLog("log", "at stores/auth.ts:78", " Store: Đã lấy đủ Token (Todo & CRM).");
        } catch (error) {
          formatAppLog("error", "at stores/auth.ts:80", " Store: Lỗi lấy module tokens:", error);
          this.logout();
          throw error;
        }
      },
      async loginDevMode() {
        const devUser = "hoangtinvpm";
        const devPass = "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f";
        const devUid = "87d90802634146e29721476337bce64b";
        const devProject = "PR202511211001129372";
        try {
          formatAppLog("log", "at stores/auth.ts:97", "Store: Đang gọi API đăng nhập hệ thống...");
          const loginData = await systemLogin(devUser, devPass);
          this.setAuthData({
            rootToken: loginData.access_token,
            uid: devUid,
            projectCode: devProject
          });
          await this.fetchModuleTokens();
        } catch (error) {
          formatAppLog("error", "at stores/auth.ts:108", " Store: Đăng nhập Dev thất bại", error);
        }
      },
      async initialize(options) {
        formatAppLog("log", "at stores/auth.ts:113", " Store: Khởi tạo Auth...");
        if (this.todoToken && this.crmToken) {
          formatAppLog("log", "at stores/auth.ts:115", ">>  Đã có đủ Token cũ. Ready!");
          return;
        }
        if (this.isRootTokenValid) {
          formatAppLog("log", "at stores/auth.ts:120", "️ Thiếu token module, đang lấy lại...");
          await this.fetchModuleTokens();
          return;
        }
        formatAppLog("log", "at stores/auth.ts:125", "Root Token hết hạn. Login lại...");
        await this.loginDevMode();
      },
      async exchangeForTodoToken() {
        await this.fetchModuleTokens();
      },
      logout() {
        formatAppLog("log", "at stores/auth.ts:132", "Store: Đăng xuất...");
        this.rootToken = "";
        this.rootLoginTime = 0;
        this.todoToken = "";
        this.crmToken = "";
        uni.removeStorageSync("crm_access_token");
        uni.removeStorageSync("todo_access_token");
        uni.removeStorageSync("vbot_root_token");
        uni.removeStorageSync("vbot_root_login_time");
      }
    }
  });
  const request = async (options) => {
    const authStore = useAuthStore();
    const token = authStore.todoToken || authStore.rootToken;
    const headers = {
      "Content-Type": "application/json",
      ...options.header
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: options.url,
        method: options.method || "GET",
        data: options.data || {},
        header: headers,
        success: async (res) => {
          const data = res.data;
          if (res.statusCode === 200) {
            resolve(data.data);
            return;
          }
          if (res.statusCode === 401) {
            formatAppLog("warn", "at utils/request.ts:40", `API 401: Token hết hạn tại ${options.url}`);
            if (options._isRetry) {
              formatAppLog("error", "at utils/request.ts:43", " Refresh Token cũng thất bại -> Logout.");
              authStore.logout();
              reject(data);
              return;
            }
            try {
              await authStore.exchangeForTodoToken();
              formatAppLog("log", "at utils/request.ts:51", " Đã Refresh Token -> Đang gọi lại API cũ...");
              const retryResult = await request({
                ...options,
                _isRetry: true
              });
              resolve(retryResult);
            } catch (err) {
              authStore.logout();
              reject(err);
            }
            return;
          }
          formatAppLog("error", "at utils/request.ts:66", `[API Error ${res.statusCode}]`, data);
          reject(data);
        },
        fail: (err) => {
          formatAppLog("error", "at utils/request.ts:71", "[Network Error]", err);
          reject(err);
        }
      });
    });
  };
  const TODO_STATUS = {
    NEW: "TO_DO",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
    OVERDUE: "OVERDUE"
  };
  const STATUS_LABELS = {
    "TO_DO": "Chưa xử lý",
    "IN_PROGRESS": "Đang xử lý",
    "DONE": "Hoàn thành",
    "OVERDUE": "Quá hạn"
  };
  const STATUS_COLORS = {
    "TO_DO": "bg-gray",
    "IN_PROGRESS": "bg-orange",
    "DONE": "bg-green",
    "OVERDUE": "bg-red"
  };
  const TIMELINE_TYPE_MAP = {
    "HISTORY_CALL_IN": "Cuộc gọi đến",
    "HISTORY_CALL_OUT": "Cuộc gọi đi",
    "HISTORY_MISS_CALL": "Cuộc gọi nhỡ",
    "NEW_TICKET": "Tạo mới ticket",
    "REOPEN_TICKET": "Mở lại ticket",
    "NEW_SUB_TICKET": "Tạo ticket con",
    "UPDATE_STATUS_TICKET": "Cập nhật trạng thái ticket",
    "UPDATE_ASSIGNEE_TICKET": "Đổi người xử lý ticket",
    "NEW_TODO": "Tạo mới công việc",
    "REOPEN_TODO": "Mở lại công việc",
    "UPDATE_STATUS_TODO": "Cập nhật trạng thái công việc",
    "UPDATE_ASSIGNEE_TODO": "Đổi người thực hiện công việc",
    "CUSTOMER_UPDATE": "Cập nhật thông tin khách hàng",
    "NOTE_INSERT": "Thêm ghi chú",
    "NOTE_UPDATE": "Sửa ghi chú",
    "NOTE_DELETE": "Xóa ghi chú"
  };
  const formatFullDateTime = (timestamp) => {
    if (!timestamp || timestamp === -1 || timestamp === 0)
      return "";
    const date = new Date(timestamp);
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    const h = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    date.getSeconds().toString().padStart(2, "0");
    return `${d}/${m}/${y} ${h}:${min}`;
  };
  const buildTodoParams = (filter, statusValue, sourceValue, creatorId, assigneeId) => {
    const validCreatedTo = filter.createdTo || filter.createdFrom;
    const validDueDateTo = filter.dueDateTo || filter.dueDateFrom;
    const validNotifyTo = filter.notifyTo || filter.notifyFrom;
    return {
      keySearch: filter.title || "",
      code: filter.jobCode || "",
      status: statusValue || "",
      startDate: getStartOfDay(filter.createdFrom),
      endDate: getStartOfDay(validCreatedTo),
      dueDateFrom: getStartOfDay(filter.dueDateFrom),
      dueDateTo: getStartOfDay(validDueDateTo),
      notificationReceivedAtFrom: getStartOfDay(filter.notifyFrom),
      notificationReceivedAtTo: getStartOfDay(validNotifyTo),
      createdBy: creatorId || "",
      assigneeId: assigneeId || "",
      customerCode: filter.customerCode || "",
      links: sourceValue || "",
      groupId: "",
      transId: "",
      pluginType: ""
    };
  };
  const mapTodoFromApi = (apiData) => {
    if (!apiData)
      return {};
    const status = apiData.status || TODO_STATUS.NEW;
    const title = apiData.title || "Không tên";
    return {
      ...apiData,
      title,
      statusClass: STATUS_COLORS[status] || "bg-orange",
      statusLabel: STATUS_LABELS[status] || status,
      avatarText: title.substring(0, 2).toUpperCase(),
      createdAtFormatted: formatFullDateTime(apiData.createdAt),
      dueDateFormatted: formatFullDateTime(apiData.dueDate),
      notifyAtFormatted: formatFullDateTime(apiData.notificationReceivedAt)
    };
  };
  const getTodos = async (params) => {
    const response = await request({
      url: `${TODO_API_URL}/getAll`,
      method: "GET",
      data: {
        projectCode: PROJECT_CODE,
        pageNo: 1,
        pageSize: 15,
        ...params
      }
    });
    if (Array.isArray(response)) {
      return response.map((item) => mapTodoFromApi(item));
    }
    return [];
  };
  const getTodoCount = async (params) => {
    const response = await request({
      url: `${TODO_API_URL}/countAll`,
      method: "GET",
      data: {
        projectCode: PROJECT_CODE,
        ...params
      }
    });
    return Number(response) || 0;
  };
  const createTodo = (data) => {
    return request({
      url: `${TODO_API_URL}/create`,
      method: "POST",
      data
    });
  };
  const deleteTodo = (id) => {
    return request({
      url: `${TODO_API_URL}/delete`,
      method: "POST",
      data: { id }
    });
  };
  const getTodoDetail = (id) => {
    return request({
      url: `${TODO_API_URL}/getDetail`,
      method: "GET",
      data: {
        id,
        projectCode: PROJECT_CODE
      }
    });
  };
  const updateTodo = (data) => {
    return request({
      url: `${TODO_API_URL}/update`,
      method: "POST",
      data
    });
  };
  const getTodoMessages = (todoId, keySearch = "") => {
    return request({
      url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/getAllNoPageWithReact`,
      method: "GET",
      data: {
        todoId,
        keySearch
      }
    });
  };
  const createTodoMessage = (data) => {
    return request({
      url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/create`,
      method: "POST",
      data
    });
  };
  const deleteTodoMessage = (id) => {
    return request({
      url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/delete`,
      method: "POST",
      data: { id }
    });
  };
  const getTodoMessageDetail = (id, todoId) => {
    return request({
      url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/getDetail`,
      method: "GET",
      data: {
        id,
        todoId
      }
    });
  };
  const updateTodoMessage = (data) => {
    return request({
      url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/update`,
      method: "POST",
      data
    });
  };
  const reactionTodoMessage = (data) => {
    return request({
      url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/reaction`,
      method: "POST",
      data
    });
  };
  const uploadTodoFile = (filePath) => {
    const authStore = useAuthStore();
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: `${SERVER_BASE_URL}/api/module-todo/file/upload`,
        filePath,
        name: "file",
        header: {
          "Authorization": `Bearer ${authStore.todoToken}`
        },
        success: (uploadFileRes) => {
          try {
            const res = JSON.parse(uploadFileRes.data);
            if (res.status === 200 && res.data) {
              resolve(res.data);
            } else {
              reject(res.message || "Upload thất bại");
            }
          } catch (e) {
            reject("Lỗi phân tích phản hồi từ server");
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  };
  const getAllMembers = () => {
    const authStore = useAuthStore();
    const { rootToken, projectCode } = authStore;
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${PROJECT_API_URL}/getAllMember`,
        method: "GET",
        data: {
          projectCode,
          status: "all"
        },
        header: {
          "Authorization": `Bearer ${rootToken}`,
          "Content-Type": "application/json"
        },
        success: (res) => {
          const body = res.data;
          if (body.status === 1 && body.data) {
            resolve(body.data);
          } else {
            reject(body.message || "Lỗi lấy danh sách thành viên");
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  };
  const showMessage = (message, type = "success") => {
    uni.$emit("app-toast-show", { message, type });
  };
  const showSuccess = (msg) => showMessage(msg, "success");
  const showError = (msg) => showMessage(msg, "error");
  const showInfo = (msg) => showMessage(msg, "info");
  const showLoading = (title = "Đang xử lý...") => uni.showLoading({ title, mask: true });
  const hideLoading = () => uni.hideLoading();
  const usePagination = (defaultPageSize = 15) => {
    const pageNo = vue.ref(1);
    const pageSize = vue.ref(defaultPageSize);
    const totalCount = vue.ref(0);
    const pageSizeOptions = [5, 10, 15, 20];
    const totalPages = vue.computed(() => {
      if (totalCount.value === 0)
        return 1;
      return Math.ceil(totalCount.value / pageSize.value);
    });
    const resetPage = () => {
      pageNo.value = 1;
    };
    const setTotal = (count) => {
      totalCount.value = count;
    };
    const changePage = (step) => {
      const newPage = pageNo.value + step;
      if (newPage >= 1 && newPage <= totalPages.value) {
        pageNo.value = newPage;
        return true;
      }
      return false;
    };
    const changePageSize = (newSize) => {
      pageSize.value = newSize;
      pageNo.value = 1;
    };
    return {
      pageNo,
      pageSize,
      totalCount,
      pageSizeOptions,
      totalPages,
      resetPage,
      setTotal,
      changePage,
      changePageSize
    };
  };
  const useCustomerFilter = () => {
    const authStore = useAuthStore();
    const customerList = vue.ref([]);
    const loadingCustomer = vue.ref(false);
    const loadingMore = vue.ref(false);
    const currentPage = vue.ref(1);
    const savedFilter = vue.ref({});
    const isFinished = vue.ref(false);
    const PAGE_SIZE = 15;
    const fetchCustomers = async (searchFilter = {}, isLoadMore = false) => {
      if (isLoadMore) {
        if (isFinished.value || loadingMore.value)
          return;
        loadingMore.value = true;
        currentPage.value += 1;
      } else {
        loadingCustomer.value = true;
        currentPage.value = 1;
        customerList.value = [];
        isFinished.value = false;
        savedFilter.value = searchFilter;
      }
      try {
        const token = authStore.crmToken;
        if (!token)
          return;
        const fields = await getCrmFieldSearch(token);
        const findFieldId = (code, defaultId) => {
          const f = fields.find((item) => item.code === code);
          return f ? f.id : defaultId;
        };
        const createAtId = findFieldId("create_at", -1);
        const nameId = findFieldId("name", 154);
        const phoneId = findFieldId("phone", 155);
        const memberNoId = findFieldId("member_no", 156);
        const activeFilter = isLoadMore ? savedFilter.value : searchFilter;
        const filterName = (activeFilter == null ? void 0 : activeFilter.name) || "";
        const filterPhone = (activeFilter == null ? void 0 : activeFilter.phone) || "";
        const filterMemberUID = (activeFilter == null ? void 0 : activeFilter.managerUID) || "";
        const dateValue = convertDateRangeToValue(activeFilter == null ? void 0 : activeFilter.startDate, activeFilter == null ? void 0 : activeFilter.endDate);
        const requestBody = {
          page: currentPage.value,
          size: PAGE_SIZE,
          fieldSearch: [
            { id: createAtId, value: dateValue, type: "RANGER", isSearch: !!dateValue },
            { id: nameId, value: filterName, type: "CONTAIN", isSearch: !!filterName },
            { id: phoneId, value: filterPhone, type: "CONTAIN", isSearch: !!filterPhone },
            { id: memberNoId, value: filterMemberUID, type: "EQUAL", isSearch: !!filterMemberUID }
          ]
        };
        const rawData = await getCrmCustomers(token, requestBody);
        const mappedData = rawData.map((item) => {
          const nameObj = item.customerFieldItems.find((f) => f.code === "name");
          const phoneObj = item.customerFieldItems.find((f) => f.code === "phone");
          return {
            id: item.id,
            uid: item.uid,
            createAt: item.createAt,
            name: nameObj ? nameObj.value : "(Không tên)",
            phone: phoneObj ? phoneObj.value : "",
            code: item.code || ""
          };
        });
        if (isLoadMore) {
          customerList.value = [...customerList.value, ...mappedData];
        } else {
          customerList.value = mappedData;
        }
        if (mappedData.length < PAGE_SIZE) {
          isFinished.value = true;
        }
      } catch (error) {
        formatAppLog("error", "at composables/useCustomerFilter.ts:92", "Lỗi tải khách hàng:", error);
        showError("Lỗi tải dữ liệu CRM");
      } finally {
        loadingCustomer.value = false;
        loadingMore.value = false;
      }
    };
    const loadMoreCustomers = () => {
      fetchCustomers(null, true);
    };
    return {
      customerList,
      loadingCustomer,
      loadingMore,
      fetchCustomers,
      loadMoreCustomers
    };
  };
  const useListTodoController = () => {
    const { t } = useI18n();
    const todos = vue.ref([]);
    const {
      pageNo,
      pageSize,
      totalCount,
      pageSizeOptions,
      resetPage,
      setTotal,
      changePage,
      changePageSize
    } = usePagination(15);
    const isLoading = vue.ref(false);
    const isFilterOpen = vue.ref(false);
    useAuthStore();
    const showCustomerModal = vue.ref(false);
    const selectedCustomerName = vue.ref("");
    const isConfirmDeleteOpen = vue.ref(false);
    const itemToDelete = vue.ref(null);
    const statusOptions = vue.computed(() => [
      t("common.all"),
      t("todo.status_todo"),
      t("todo.status_progress"),
      t("todo.status_done"),
      t("todo.status_overdue")
    ]);
    const statusValues = ["", TODO_STATUS.NEW, TODO_STATUS.IN_PROGRESS, TODO_STATUS.DONE, TODO_STATUS.OVERDUE];
    const statusIndex = vue.ref(0);
    const rawMemberList = vue.ref([]);
    const creatorOptions = vue.computed(() => {
      const names = rawMemberList.value.map((m) => m.UserName || t("common.hidden_member"));
      return [t("common.all"), ...names];
    });
    const creatorIndex = vue.ref(0);
    const assigneeOptions = vue.computed(() => {
      const names = rawMemberList.value.map((m) => m.UserName || "Thành viên ẩn");
      return [t("common.all"), ...names];
    });
    const assigneeIndex = vue.ref(0);
    const sourceOptions = vue.computed(() => [
      t("common.all"),
      t("source.call"),
      t("source.customer"),
      t("source.conversation"),
      t("source.message")
    ]);
    const sourceValues = ["", TODO_SOURCE.CALL, TODO_SOURCE.CUSTOMER, TODO_SOURCE.CONVERSATION, TODO_SOURCE.CHAT_MESSAGE];
    const sourceIndex = vue.ref(0);
    const filter = vue.ref({
      title: "",
      jobCode: "",
      createdFrom: "",
      createdTo: "",
      dueDateFrom: "",
      dueDateTo: "",
      customerCode: "",
      notifyFrom: "",
      notifyTo: ""
    });
    const fetchFilterMembers = async () => {
      if (rawMemberList.value.length > 0)
        return;
      try {
        const data = await getAllMembers();
        rawMemberList.value = data;
      } catch (error) {
        formatAppLog("error", "at controllers/list_todo.ts:78", "Lỗi lấy danh sách thành viên filter:", error);
      }
    };
    const {
      customerList,
      loadingCustomer,
      loadingMore,
      fetchCustomers,
      loadMoreCustomers
    } = useCustomerFilter();
    const fetchData = async () => {
      if (todos.value.length === 0) {
        isLoading.value = true;
      }
      try {
        const params = {
          ...filter.value,
          pageNo: pageNo.value,
          pageSize: pageSize.value
        };
        let selectedCreatorId = "";
        if (creatorIndex.value > 0) {
          const member = rawMemberList.value[creatorIndex.value - 1];
          selectedCreatorId = member.memberUID || "";
        }
        let selectedAssigneeId = "";
        if (assigneeIndex.value > 0) {
          const member = rawMemberList.value[assigneeIndex.value - 1];
          selectedAssigneeId = member.memberUID || "";
        }
        const filterParams = buildTodoParams(
          filter.value,
          statusValues[statusIndex.value],
          sourceValues[sourceIndex.value],
          selectedCreatorId,
          selectedAssigneeId
        );
        const [listData, countData] = await Promise.all([
          getTodos({
            ...filterParams,
            pageNo: pageNo.value,
            pageSize: pageSize.value
          }),
          getTodoCount(filterParams)
        ]);
        todos.value = listData || [];
        setTotal(countData || 0);
      } catch (error) {
        formatAppLog("error", "at controllers/list_todo.ts:132", error);
        showError("Lỗi tải dữ liệu");
      } finally {
        isLoading.value = false;
      }
    };
    const onChangePage = (step) => {
      const changed = changePage(step);
      if (changed) {
        getTodoList();
      }
    };
    const onUpdatePageSize = (newSize) => {
      changePageSize(newSize);
      getTodoList();
    };
    const openCustomerPopup = () => {
      showCustomerModal.value = true;
      fetchFilterMembers();
      if (customerList.value.length === 0) {
        fetchCustomers({});
      }
    };
    const onCustomerSelect = (customer) => {
      filter.value.customerCode = customer.uid;
      selectedCustomerName.value = customer.name;
      showCustomerModal.value = false;
    };
    const onFilterCustomerInModal = (filterParams) => {
      fetchCustomers(filterParams);
    };
    const onRequestDelete = (item) => {
      itemToDelete.value = item;
      isConfirmDeleteOpen.value = true;
    };
    const cancelDelete = () => {
      isConfirmDeleteOpen.value = false;
      itemToDelete.value = null;
    };
    const getTodoList = async () => {
      if (todos.value.length === 0) {
        isLoading.value = true;
      }
      try {
        let selectedCreatorId = "";
        if (creatorIndex.value > 0) {
          const member = rawMemberList.value[creatorIndex.value - 1];
          selectedCreatorId = member.UID || "";
        }
        let selectedAssigneeId = "";
        if (assigneeIndex.value > 0) {
          const member = rawMemberList.value[assigneeIndex.value - 1];
          selectedAssigneeId = member.UID || "";
        }
        const filterParams = buildTodoParams(
          filter.value,
          statusValues[statusIndex.value],
          sourceValues[sourceIndex.value],
          selectedCreatorId,
          selectedAssigneeId
        );
        const [listData, countData] = await Promise.all([
          getTodos({
            ...filterParams,
            pageNo: pageNo.value,
            pageSize: pageSize.value
          }),
          getTodoCount(filterParams)
        ]);
        todos.value = listData || [];
        setTotal(countData || 0);
      } catch (error) {
        formatAppLog("error", "at controllers/list_todo.ts:211", error);
        showError(t("common.error_load"));
        if (todos.value.length === 0) {
          todos.value = [];
        }
      } finally {
        isLoading.value = false;
        uni.stopPullDownRefresh();
      }
    };
    onPullDownRefresh(() => {
      formatAppLog("log", "at controllers/list_todo.ts:222", "Đang làm mới trang...");
      resetPage();
      getTodoList();
    });
    const confirmDelete = async () => {
      if (!itemToDelete.value)
        return;
      try {
        await deleteTodo(itemToDelete.value.id);
        showSuccess(t("common.success_delete"));
        isConfirmDeleteOpen.value = false;
        itemToDelete.value = null;
        getTodoList();
      } catch (error) {
        formatAppLog("error", "at controllers/list_todo.ts:235", "Delete Error:", error);
        showError(t("common.fail_delete"));
      }
    };
    const showActionMenu = (item) => {
      uni.showActionSheet({
        itemList: [t("common.delete")],
        itemColor: "#ff3b30",
        success: (res) => {
          if (res.tapIndex === 0)
            onRequestDelete(item);
        }
      });
    };
    const addNewTask = () => {
      uni.navigateTo({ url: "/pages/todo/create_todo" });
    };
    const openFilter = () => {
      isFilterOpen.value = true;
      fetchFilterMembers();
    };
    const closeFilter = () => {
      isFilterOpen.value = false;
    };
    const onStatusChange = (e) => {
      statusIndex.value = e.detail.value;
    };
    const onCreatorChange = (e) => {
      creatorIndex.value = e.detail.value;
    };
    const onAssigneeChange = (e) => {
      assigneeIndex.value = e.detail.value;
    };
    const onSourceChange = (e) => {
      sourceIndex.value = e.detail.value;
    };
    const resetFilter = () => {
      filter.value = {
        title: "",
        jobCode: "",
        createdFrom: "",
        createdTo: "",
        dueDateFrom: "",
        dueDateTo: "",
        customerCode: "",
        notifyFrom: "",
        notifyTo: ""
      };
      statusIndex.value = 0;
      creatorIndex.value = 0;
      assigneeIndex.value = 0;
      sourceIndex.value = 0;
      selectedCustomerName.value = "";
      resetPage();
      getTodoList();
      closeFilter();
    };
    const applyFilter = () => {
      resetPage();
      fetchData();
      closeFilter();
    };
    onShow(() => {
      getTodoList();
    });
    const goToDetail = (item) => {
      uni.navigateTo({
        url: `/pages/todo/todo_detail?id=${item.id}`
      });
    };
    return {
      todos,
      isLoading,
      isFilterOpen,
      filter,
      goToDetail,
      isConfirmDeleteOpen,
      itemToDelete,
      pageSizeOptions,
      statusOptions,
      statusIndex,
      onStatusChange,
      creatorOptions,
      creatorIndex,
      onCreatorChange,
      assigneeOptions,
      assigneeIndex,
      onAssigneeChange,
      sourceOptions,
      sourceIndex,
      onSourceChange,
      addNewTask,
      openFilter,
      closeFilter,
      resetFilter,
      applyFilter,
      showActionMenu,
      cancelDelete,
      confirmDelete,
      showCustomerModal,
      loadingCustomer,
      customerList,
      selectedCustomerName,
      openCustomerPopup,
      onCustomerSelect,
      onFilterCustomerInModal,
      pageNo,
      pageSize,
      totalCount,
      onChangePage,
      onUpdatePageSize,
      rawMemberList,
      fetchCustomers,
      loadingMore,
      loadMoreCustomers
    };
  };
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "StatusBadge",
    props: {
      status: { type: String, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const { t } = useI18n();
      const props = __props;
      const badgeLabel = vue.computed(() => {
        switch (props.status) {
          case TODO_STATUS.NEW:
            return t("todo.status_todo");
          case TODO_STATUS.IN_PROGRESS:
            return t("todo.status_progress");
          case TODO_STATUS.DONE:
            return t("todo.status_done");
          case TODO_STATUS.OVERDUE:
            return t("todo.status_overdue");
          default:
            return props.status || "Unknown";
        }
      });
      const badgeColorClass = vue.computed(() => {
        switch (props.status) {
          case TODO_STATUS.NEW:
            return "bg-gray-200 text-gray-600";
          case TODO_STATUS.IN_PROGRESS:
            return "bg-orange-100 text-orange-600";
          case TODO_STATUS.DONE:
            return "bg-green-100 text-green-600";
          case TODO_STATUS.OVERDUE:
            return "bg-red-100 text-red-600";
          default:
            return "bg-gray-100 text-gray-400";
        }
      });
      const customStyle = vue.computed(() => {
        switch (props.status) {
          case TODO_STATUS.NEW:
            return { backgroundColor: "#e4e4e7", color: "#52525b" };
          case TODO_STATUS.IN_PROGRESS:
            return { backgroundColor: "#ffedd5", color: "#c2410c" };
          case TODO_STATUS.DONE:
            return { backgroundColor: "#dcfce7", color: "#15803d" };
          case TODO_STATUS.OVERDUE:
            return { backgroundColor: "#fee2e2", color: "#dc2626" };
          default:
            return { backgroundColor: "#f4f4f5", color: "#a1a1aa" };
        }
      });
      const __returned__ = { t, props, badgeLabel, badgeColorClass, customStyle };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["px-2 py-1 rounded-full text-xs font-bold inline-block text-center min-w-[80px]", $setup.badgeColorClass]),
        style: vue.normalizeStyle($setup.customStyle)
      },
      vue.toDisplayString($setup.badgeLabel),
      7
      /* TEXT, CLASS, STYLE */
    );
  }
  const StatusBadge = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-7f144565"], ["__file", "D:/uni_app/vbot-todo-android-2/components/StatusBadge.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "AppButton",
    props: {
      label: { type: String, required: false, default: "" },
      type: { type: String, required: false, default: "primary" },
      size: { type: String, required: false, default: "normal" },
      disabled: { type: Boolean, required: false, default: false },
      loading: { type: Boolean, required: false, default: false }
    },
    emits: ["click"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const handleClick = (event) => {
        if (!props.disabled && !props.loading) {
          emit("click", event);
        }
      };
      const __returned__ = { props, emit, handleClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      class: vue.normalizeClass(["app-btn", [
        `btn-${$props.type}`,
        $props.size === "small" ? "btn-sm" : "",
        { "is-disabled": $props.disabled || $props.loading }
      ]]),
      disabled: $props.disabled || $props.loading,
      onClick: $setup.handleClick,
      "hover-class": "btn-hover"
    }, [
      $props.loading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "loading-spinner"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createElementVNode(
          "text",
          { class: "btn-text" },
          vue.toDisplayString($props.label),
          1
          /* TEXT */
        )
      ], true)
    ], 10, ["disabled"]);
  }
  const AppButton = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-2f131dae"], ["__file", "D:/uni_app/vbot-todo-android-2/components/AppButton.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "GlobalMessage",
    setup(__props, { expose: __expose }) {
      __expose();
      const isVisible = vue.ref(false);
      const msgContent = vue.ref("");
      const msgType = vue.ref("success");
      const safeAreaTop = vue.ref(0);
      let timer = null;
      const icons2 = {
        success: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23047857%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-2%2015l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%3C%2Fsvg%3E",
        error: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23b91c1c%22%3E%3Cpath%20d%3D%22M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%22%2F%3E%3C%2Fsvg%3E",
        info: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%231d4ed8%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm1%2015h-2v-6h2v6zm0-8h-2V7h2v2z%22%2F%3E%3C%2Fsvg%3E",
        warning: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23b45309%22%3E%3Cpath%20d%3D%22M1%2021h22L12%202%201%2021zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z%22%2F%3E%3C%2Fsvg%3E"
      };
      const iconPath = vue.computed(() => {
        return icons2[msgType.value] || icons2["info"];
      });
      const handleShowToast = (data) => {
        if (timer) {
          clearTimeout(timer);
          isVisible.value = false;
        }
        msgContent.value = data.message;
        msgType.value = data.type || "success";
        setTimeout(() => {
          isVisible.value = true;
        }, 50);
        timer = setTimeout(() => {
          isVisible.value = false;
        }, 3e3);
      };
      vue.onMounted(() => {
        const sysInfo = uni.getSystemInfoSync();
        safeAreaTop.value = sysInfo.statusBarHeight || 0;
        uni.$on("app-toast-show", handleShowToast);
        uni.onNetworkStatusChange((res) => {
          if (!res.isConnected) {
            handleShowToast({
              message: "Mất kết nối Internet. Vui lòng kiểm tra lại.",
              type: "error"
            });
          } else {
            handleShowToast({
              message: "Đã khôi phục kết nối Internet.",
              type: "success"
            });
          }
        });
        uni.getNetworkType({
          success: (res) => {
            if (res.networkType === "none") {
              handleShowToast({
                message: "Không có kết nối Internet.",
                type: "error"
              });
            }
          }
        });
      });
      vue.onUnmounted(() => {
        uni.$off("app-toast-show", handleShowToast);
      });
      const __returned__ = { isVisible, msgContent, msgType, safeAreaTop, get timer() {
        return timer;
      }, set timer(v) {
        timer = v;
      }, icons: icons2, iconPath, handleShowToast };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["global-message-container", { "show": $setup.isVisible }]),
        style: vue.normalizeStyle({ paddingTop: $setup.safeAreaTop + 10 + "px" })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["message-content", $setup.msgType])
          },
          [
            vue.createElementVNode("image", {
              src: $setup.iconPath,
              class: "msg-icon",
              mode: "aspectFit"
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "text",
              { class: "msg-text" },
              vue.toDisplayString($setup.msgContent),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const GlobalMessage = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-2f57c33b"], ["__file", "D:/uni_app/vbot-todo-android-2/components/GlobalMessage.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "ConfirmModal",
    props: {
      visible: { type: Boolean, required: true },
      title: { type: String, required: false, default: "Thông báo" },
      message: { type: String, required: false, default: "" },
      cancelLabel: { type: String, required: false, default: "Hủy" },
      confirmLabel: { type: String, required: false, default: "Xác nhận" },
      confirmType: { type: String, required: false, default: "primary" }
    },
    emits: ["update:visible", "confirm", "cancel"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const onCancel = () => {
        emit("update:visible", false);
        emit("cancel");
      };
      const onConfirm = () => {
        emit("confirm");
      };
      const __returned__ = { props, emit, onCancel, onConfirm, AppButton };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.visible ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "modal-overlay",
      onClick: $setup.onCancel
    }, [
      vue.createElementVNode("view", {
        class: "modal-container",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop"]))
      }, [
        vue.createElementVNode("view", { class: "modal-header" }, [
          vue.createElementVNode(
            "text",
            { class: "modal-title" },
            vue.toDisplayString($props.title),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "modal-body" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($props.message),
              1
              /* TEXT */
            )
          ], true)
        ]),
        vue.createElementVNode("view", { class: "modal-footer" }, [
          vue.createVNode($setup["AppButton"], {
            type: "secondary",
            label: $props.cancelLabel,
            class: "flex-1",
            onClick: $setup.onCancel
          }, null, 8, ["label"]),
          vue.createVNode($setup["AppButton"], {
            type: $props.confirmType,
            label: $props.confirmLabel,
            class: "flex-1",
            onClick: $setup.onConfirm
          }, null, 8, ["type", "label"])
        ])
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const ConfirmModal = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-5d0d13a1"], ["__file", "D:/uni_app/vbot-todo-android-2/components/ConfirmModal.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "Pagination",
    props: {
      pageNo: { type: Number, required: true },
      pageSize: { type: Number, required: true },
      total: { type: Number, required: true },
      pageSizeOptions: { type: Array, required: true },
      showTotal: { type: Boolean, required: false }
    },
    emits: ["changePage", "update:pageSize"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const totalPages = vue.computed(() => {
        if (!props.pageSize || props.pageSize === 0)
          return 1;
        return Math.ceil(props.total / props.pageSize) || 1;
      });
      const pageSizeIndex = vue.computed(() => {
        if (!props.pageSizeOptions)
          return 0;
        const idx = props.pageSizeOptions.indexOf(props.pageSize);
        return idx !== -1 ? idx : 0;
      });
      const onPageSizeChange = (e) => {
        const index = e.detail.value;
        if (props.pageSizeOptions && props.pageSizeOptions[index]) {
          const newSize = props.pageSizeOptions[index];
          emit("update:pageSize", newSize);
        }
      };
      const onPrev = () => {
        if (props.pageNo > 1) {
          emit("changePage", -1);
        }
      };
      const onNext = () => {
        if (props.pageNo < totalPages.value) {
          emit("changePage", 1);
        }
      };
      const __returned__ = { props, emit, totalPages, pageSizeIndex, onPageSizeChange, onPrev, onNext };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "pagination-footer" }, [
      vue.createElementVNode("picker", {
        mode: "selector",
        range: $props.pageSizeOptions,
        value: $setup.pageSizeIndex,
        onChange: $setup.onPageSizeChange
      }, [
        vue.createElementVNode("view", { class: "page-size-selector" }, [
          vue.createElementVNode(
            "text",
            { class: "size-text" },
            vue.toDisplayString($props.pageSize) + " / " + vue.toDisplayString(_ctx.$t("common.page_unit")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "dropdown-arrow" }, "▼")
        ])
      ], 40, ["range", "value"]),
      $props.showTotal ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: "total-text"
        },
        vue.toDisplayString(_ctx.$t("common.total")) + ": " + vue.toDisplayString($props.total),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "pagination-controls" }, [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["page-arrow", { "disabled": $props.pageNo <= 1 }]),
            onClick: $setup.onPrev
          },
          "‹",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          { class: "page-box active" },
          vue.toDisplayString($props.pageNo),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["page-arrow", { "disabled": $props.pageNo >= $setup.totalPages }]),
            onClick: $setup.onNext
          },
          "›",
          2
          /* CLASS */
        )
      ]),
      _ctx.$slots.action ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "add-btn-wrapper"
      }, [
        vue.renderSlot(_ctx.$slots, "action", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-813f2b74"], ["__file", "D:/uni_app/vbot-todo-android-2/components/Pagination.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "list_todo",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        todos,
        isLoading,
        isFilterOpen,
        filter,
        isConfirmDeleteOpen,
        itemToDelete,
        pageSizeOptions,
        pageSizeIndex,
        currentPage,
        totalPages,
        onPageSizeChange,
        changePage,
        statusOptions,
        statusIndex,
        onStatusChange,
        creatorOptions,
        creatorIndex,
        onCreatorChange,
        customerOptions,
        customerIndex,
        onCustomerChange,
        assigneeOptions,
        assigneeIndex,
        onAssigneeChange,
        sourceOptions,
        sourceIndex,
        onSourceChange,
        addNewTask,
        openFilter,
        closeFilter,
        resetFilter,
        applyFilter,
        showActionMenu,
        cancelDelete,
        confirmDelete,
        goToDetail,
        showCustomerModal,
        loadingCustomer,
        customerList,
        selectedCustomerName,
        openCustomerPopup,
        onCustomerSelect,
        onFilterCustomerInModal,
        pageNo,
        pageSize,
        totalCount,
        onChangePage,
        onUpdatePageSize,
        rawMemberList,
        loadingMore,
        loadMoreCustomers
      } = useListTodoController();
      const showCustomActionSheet = vue.ref(false);
      const selectedItemForAction = vue.ref(null);
      const openCustomMenu = (item) => {
        selectedItemForAction.value = item;
        showCustomActionSheet.value = true;
      };
      const handleCustomAction = (action) => {
        showCustomActionSheet.value = false;
        if (action === "delete") {
          itemToDelete.value = selectedItemForAction.value;
          isConfirmDeleteOpen.value = true;
        }
      };
      const __returned__ = { todos, isLoading, isFilterOpen, filter, isConfirmDeleteOpen, itemToDelete, pageSizeOptions, pageSizeIndex, currentPage, totalPages, onPageSizeChange, changePage, statusOptions, statusIndex, onStatusChange, creatorOptions, creatorIndex, onCreatorChange, customerOptions, customerIndex, onCustomerChange, assigneeOptions, assigneeIndex, onAssigneeChange, sourceOptions, sourceIndex, onSourceChange, addNewTask, openFilter, closeFilter, resetFilter, applyFilter, showActionMenu, cancelDelete, confirmDelete, goToDetail, showCustomerModal, loadingCustomer, customerList, selectedCustomerName, openCustomerPopup, onCustomerSelect, onFilterCustomerInModal, pageNo, pageSize, totalCount, onChangePage, onUpdatePageSize, rawMemberList, loadingMore, loadMoreCustomers, showCustomActionSheet, selectedItemForAction, openCustomMenu, handleCustomAction, CustomerModal, StatusBadge, DateRangeFilter, AppButton, GlobalMessage, ConfirmModal, Pagination };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _imports_0 = "/static/filter.png";
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "header-left" }),
        vue.createElementVNode(
          "text",
          { class: "header-title" },
          vue.toDisplayString(_ctx.$t("todo.page_title")),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", {
          class: "header-right",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.openFilter && $setup.openFilter(...args))
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            class: "filter-icon"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "list-container" }, [
          $setup.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-state"
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(_ctx.$t("common.loading")),
              1
              /* TEXT */
            )
          ])) : $setup.todos.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-state"
          }, [
            vue.createElementVNode("image", {
              src: "https://img.icons8.com/ios/100/cccccc/empty-box.png",
              mode: "aspectFit",
              class: "empty-icon"
            }),
            vue.createElementVNode(
              "text",
              { class: "empty-text" },
              vue.toDisplayString(_ctx.$t("common.no_data")),
              1
              /* TEXT */
            )
          ])) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
            key: 2,
            "scroll-y": "true",
            class: "list-view"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.todos, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.id || index,
                  class: "card-item",
                  onClick: ($event) => $setup.goToDetail(item)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["status-bar", item.statusClass])
                    },
                    null,
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode("view", { class: "card-body" }, [
                    vue.createElementVNode("view", { class: "card-row top-row" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "card-title" },
                        vue.toDisplayString(item.title),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", {
                        class: "action-btn",
                        onClick: vue.withModifiers(($event) => $setup.openCustomMenu(item), ["stop"])
                      }, [
                        vue.createElementVNode("text", { class: "dots" }, "•••")
                      ], 8, ["onClick"])
                    ]),
                    vue.createElementVNode("view", { class: "card-info-row" }, [
                      vue.createElementVNode("image", {
                        src: "https://img.icons8.com/ios/50/666666/time.png",
                        class: "icon-small"
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "card-date" },
                        vue.toDisplayString(_ctx.$t("todo.created_at")) + ": " + vue.toDisplayString(item.createdAtFormatted),
                        1
                        /* TEXT */
                      )
                    ]),
                    item.dueDateFormatted ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "card-info-row"
                    }, [
                      vue.createElementVNode("image", {
                        src: "https://img.icons8.com/ios/50/ff3b30/calendar--v1.png",
                        class: "icon-small"
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "card-date text-danger" },
                        vue.toDisplayString(_ctx.$t("todo.expired_at")) + ": " + vue.toDisplayString(item.dueDateFormatted),
                        1
                        /* TEXT */
                      )
                    ])) : vue.createCommentVNode("v-if", true),
                    item.notifyAtFormatted ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "card-info-row"
                    }, [
                      vue.createElementVNode("image", {
                        src: "https://img.icons8.com/ios/50/007aff/alarm.png",
                        class: "icon-small"
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "card-date text-primary" },
                        vue.toDisplayString(_ctx.$t("todo.notify_at")) + ": " + vue.toDisplayString(item.notifyAtFormatted),
                        1
                        /* TEXT */
                      )
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("view", { class: "card-row bot-row" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "code-tag" },
                        "#" + vue.toDisplayString(item.code),
                        1
                        /* TEXT */
                      ),
                      vue.createVNode($setup["StatusBadge"], {
                        status: item.status
                      }, null, 8, ["status"])
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode("view", { style: { "height": "20px" } })
          ]))
        ]),
        vue.createVNode($setup["Pagination"], {
          pageNo: $setup.pageNo,
          pageSize: $setup.pageSize,
          total: $setup.totalCount,
          pageSizeOptions: $setup.pageSizeOptions,
          onChangePage: $setup.onChangePage,
          "onUpdate:pageSize": $setup.onUpdatePageSize
        }, {
          action: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "add-task-simple",
              onClick: _cache[1] || (_cache[1] = (...args) => $setup.addNewTask && $setup.addNewTask(...args))
            }, [
              vue.createElementVNode("text", { class: "plus-icon" }, "+"),
              vue.createElementVNode(
                "text",
                { class: "add-text" },
                vue.toDisplayString(_ctx.$t("todo.add_task")),
                1
                /* TEXT */
              )
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["pageNo", "pageSize", "total", "pageSizeOptions", "onChangePage", "onUpdate:pageSize"])
      ]),
      $setup.isFilterOpen ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "filter-overlay",
        onClick: _cache[17] || (_cache[17] = vue.withModifiers((...args) => $setup.closeFilter && $setup.closeFilter(...args), ["stop"]))
      }, [
        vue.createElementVNode("view", {
          class: "filter-panel",
          onClick: _cache[16] || (_cache[16] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "filter-header" }, [
            vue.createElementVNode(
              "text",
              { class: "filter-title" },
              vue.toDisplayString(_ctx.$t("todo.filter_title")),
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", {
              class: "close-btn",
              onClick: _cache[2] || (_cache[2] = (...args) => $setup.closeFilter && $setup.closeFilter(...args))
            }, "✕")
          ]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "filter-body"
          }, [
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode(
                "text",
                { class: "f-label" },
                vue.toDisplayString(_ctx.$t("todo.search_label")),
                1
                /* TEXT */
              ),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "f-input",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.filter.title = $event),
                placeholder: _ctx.$t("todo.search_placeholder")
              }, null, 8, ["placeholder"]), [
                [vue.vModelText, $setup.filter.title]
              ])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode(
                "text",
                { class: "f-label" },
                vue.toDisplayString(_ctx.$t("todo.code_prefix")),
                1
                /* TEXT */
              ),
              vue.withDirectives(vue.createElementVNode("input", {
                class: "f-input",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.filter.jobCode = $event),
                placeholder: _ctx.$t("todo.job_code_placeholder")
              }, null, 8, ["placeholder"]), [
                [vue.vModelText, $setup.filter.jobCode]
              ])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode(
                "text",
                { class: "f-label" },
                vue.toDisplayString(_ctx.$t("todo.status")),
                1
                /* TEXT */
              ),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: $setup.statusOptions,
                value: $setup.statusIndex,
                onChange: _cache[5] || (_cache[5] = (...args) => $setup.onStatusChange && $setup.onStatusChange(...args))
              }, [
                vue.createElementVNode("view", { class: "f-picker" }, [
                  vue.createTextVNode(
                    vue.toDisplayString($setup.statusOptions[$setup.statusIndex]),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "arrow" }, "▼")
                ])
              ], 40, ["range", "value"])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode(
                "text",
                { class: "f-label" },
                vue.toDisplayString(_ctx.$t("todo.creator")),
                1
                /* TEXT */
              ),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: $setup.creatorOptions,
                value: $setup.creatorIndex,
                onChange: _cache[6] || (_cache[6] = (...args) => $setup.onCreatorChange && $setup.onCreatorChange(...args))
              }, [
                vue.createElementVNode("view", { class: "f-picker" }, [
                  vue.createTextVNode(
                    vue.toDisplayString($setup.creatorOptions[$setup.creatorIndex]),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "arrow" }, "▼")
                ])
              ], 40, ["range", "value"])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode(
                "text",
                { class: "f-label" },
                vue.toDisplayString(_ctx.$t("todo.customer")),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", {
                class: "f-input",
                onClick: _cache[7] || (_cache[7] = (...args) => $setup.openCustomerPopup && $setup.openCustomerPopup(...args)),
                style: { "justify-content": "space-between" }
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    style: vue.normalizeStyle({ color: $setup.selectedCustomerName ? "#333" : "#999" })
                  },
                  vue.toDisplayString($setup.selectedCustomerName || _ctx.$t("todo.select_customer")),
                  5
                  /* TEXT, STYLE */
                ),
                vue.createElementVNode("text", { class: "arrow" }, "›")
              ])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode(
                "text",
                { class: "f-label" },
                vue.toDisplayString(_ctx.$t("todo.assignee")),
                1
                /* TEXT */
              ),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: $setup.assigneeOptions,
                value: $setup.assigneeIndex,
                onChange: _cache[8] || (_cache[8] = (...args) => $setup.onAssigneeChange && $setup.onAssigneeChange(...args))
              }, [
                vue.createElementVNode("view", { class: "f-picker" }, [
                  vue.createTextVNode(
                    vue.toDisplayString($setup.assigneeOptions[$setup.assigneeIndex]),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "arrow" }, "▼")
                ])
              ], 40, ["range", "value"])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode(
                "text",
                { class: "f-label" },
                vue.toDisplayString(_ctx.$t("todo.source")),
                1
                /* TEXT */
              ),
              vue.createElementVNode("picker", {
                mode: "selector",
                range: $setup.sourceOptions,
                value: $setup.sourceIndex,
                onChange: _cache[9] || (_cache[9] = (...args) => $setup.onSourceChange && $setup.onSourceChange(...args))
              }, [
                vue.createElementVNode("view", { class: "f-picker" }, [
                  vue.createTextVNode(
                    vue.toDisplayString($setup.sourceOptions[$setup.sourceIndex]),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "arrow" }, "▼")
                ])
              ], 40, ["range", "value"])
            ]),
            vue.createVNode($setup["DateRangeFilter"], {
              title: _ctx.$t("todo.time_create"),
              startDate: $setup.filter.createdFrom,
              "onUpdate:startDate": _cache[10] || (_cache[10] = ($event) => $setup.filter.createdFrom = $event),
              endDate: $setup.filter.createdTo,
              "onUpdate:endDate": _cache[11] || (_cache[11] = ($event) => $setup.filter.createdTo = $event)
            }, null, 8, ["title", "startDate", "endDate"]),
            vue.createVNode($setup["DateRangeFilter"], {
              title: _ctx.$t("todo.time_expired"),
              startDate: $setup.filter.dueDateFrom,
              "onUpdate:startDate": _cache[12] || (_cache[12] = ($event) => $setup.filter.dueDateFrom = $event),
              endDate: $setup.filter.dueDateTo,
              "onUpdate:endDate": _cache[13] || (_cache[13] = ($event) => $setup.filter.dueDateTo = $event)
            }, null, 8, ["title", "startDate", "endDate"]),
            vue.createVNode($setup["DateRangeFilter"], {
              title: _ctx.$t("todo.time_notify"),
              startDate: $setup.filter.notifyFrom,
              "onUpdate:startDate": _cache[14] || (_cache[14] = ($event) => $setup.filter.notifyFrom = $event),
              endDate: $setup.filter.notifyTo,
              "onUpdate:endDate": _cache[15] || (_cache[15] = ($event) => $setup.filter.notifyTo = $event)
            }, null, 8, ["title", "startDate", "endDate"]),
            vue.createElementVNode("view", { style: { "height": "20px" } })
          ]),
          vue.createElementVNode("view", { class: "filter-footer" }, [
            vue.createVNode($setup["AppButton"], {
              type: "secondary",
              label: _ctx.$t("common.reset"),
              class: "btn-filter-reset",
              onClick: $setup.resetFilter
            }, null, 8, ["label", "onClick"]),
            vue.createVNode($setup["AppButton"], {
              type: "primary",
              label: _ctx.$t("common.apply"),
              class: "btn-filter-apply",
              onClick: $setup.applyFilter
            }, null, 8, ["label", "onClick"])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode($setup["CustomerModal"], {
        visible: $setup.showCustomerModal,
        loading: $setup.loadingCustomer,
        loadingMore: $setup.loadingMore,
        customers: $setup.customerList,
        managers: $setup.rawMemberList,
        onClose: _cache[18] || (_cache[18] = ($event) => $setup.showCustomerModal = false),
        onSelect: $setup.onCustomerSelect,
        onFilter: $setup.onFilterCustomerInModal,
        onLoadMore: $setup.loadMoreCustomers
      }, null, 8, ["visible", "loading", "loadingMore", "customers", "managers", "onSelect", "onFilter", "onLoadMore"]),
      vue.createVNode($setup["ConfirmModal"], {
        visible: $setup.isConfirmDeleteOpen,
        "onUpdate:visible": _cache[19] || (_cache[19] = ($event) => $setup.isConfirmDeleteOpen = $event),
        title: _ctx.$t("common.notification"),
        message: $setup.itemToDelete ? _ctx.$t("todo.confirm_delete_msg").replace("{title}", $setup.itemToDelete.title) : "",
        "confirm-type": "danger",
        "cancel-label": _ctx.$t("common.cancel"),
        "confirm-label": _ctx.$t("common.delete"),
        onConfirm: $setup.confirmDelete,
        onCancel: $setup.cancelDelete
      }, null, 8, ["visible", "title", "message", "cancel-label", "confirm-label", "onConfirm", "onCancel"]),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["custom-sheet-mask", { "show": $setup.showCustomActionSheet }]),
          onClick: _cache[23] || (_cache[23] = ($event) => $setup.showCustomActionSheet = false)
        },
        [
          vue.createElementVNode("view", {
            class: "custom-sheet-panel",
            onClick: _cache[22] || (_cache[22] = vue.withModifiers(() => {
            }, ["stop"]))
          }, [
            vue.createElementVNode("view", {
              class: "sheet-item delete",
              onClick: _cache[20] || (_cache[20] = ($event) => $setup.handleCustomAction("delete"))
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(_ctx.$t("common.delete")),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "sheet-gap" }),
            vue.createElementVNode("view", {
              class: "sheet-item cancel",
              onClick: _cache[21] || (_cache[21] = ($event) => $setup.showCustomActionSheet = false)
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(_ctx.$t("common.cancel")),
                1
                /* TEXT */
              )
            ])
          ])
        ],
        2
        /* CLASS */
      ),
      vue.createVNode($setup["GlobalMessage"])
    ]);
  }
  const PagesTodoListTodo = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-1b4e60ea"], ["__file", "D:/uni_app/vbot-todo-android-2/pages/todo/list_todo.vue"]]);
  const dateToTimestamp = (dateStr) => {
    if (!dateStr)
      return 0;
    const safeDateStr = dateStr.replace(/-/g, "/");
    const dateObj = new Date(safeDateStr);
    return isNaN(dateObj.getTime()) ? 0 : dateObj.getTime();
  };
  const buildCreateTodoPayload = (form, config) => {
    formatAppLog("log", "at models/create_todo.ts:16", "Check date values:", {
      dueDate: form.dueDate,
      notifyAt: form.notifyAt
    });
    return {
      title: form.name,
      description: form.desc || DEFAULT_VALUES.STRING,
      projectCode: config.projectCode,
      createdBy: config.uid,
      status: TODO_STATUS.NEW,
      links: config.link || TODO_SOURCE.CALL,
      pluginType: DEFAULT_VALUES.PLUGIN_TYPE,
      customerCode: form.customerUid || DEFAULT_VALUES.CUSTOMER_CODE,
      assigneeId: form.assignee || DEFAULT_VALUES.ASSIGNEE_ID,
      groupId: DEFAULT_VALUES.GROUP_ID,
      transId: DEFAULT_VALUES.TRANS_ID,
      tagCodes: "test1",
      groupMemberUid: "test1",
      files: config.uploadedFiles || DEFAULT_VALUES.STRING,
      phone: DEFAULT_VALUES.PHONE_PLACEHOLDER,
      dueDate: dateToTimestamp(form.dueDate),
      notificationReceivedAt: dateToTimestamp(form.notifyAt)
    };
  };
  const useCreateTodoController = () => {
    const { t } = useI18n();
    useAuthStore();
    const pad = (n) => n.toString().padStart(2, "0");
    const getCurrentDateTimeISO = () => {
      const d = /* @__PURE__ */ new Date();
      const y = d.getFullYear();
      const m = pad(d.getMonth() + 1);
      const day = pad(d.getDate());
      const h = pad(d.getHours());
      const min = pad(d.getMinutes());
      return `${y}-${m}-${day} ${h}:${min}:00`;
    };
    const {
      customerList,
      loadingCustomer,
      loadingMore,
      fetchCustomers,
      loadMoreCustomers
    } = useCustomerFilter();
    const loading = vue.ref(false);
    const form = vue.ref({
      name: "",
      desc: "",
      customer: "",
      customerUid: "",
      assignee: "",
      dueDate: getCurrentDateTimeISO(),
      notifyAt: getCurrentDateTimeISO()
    });
    const sourceOptions = vue.computed(() => [
      t("source.call"),
      t("source.customer"),
      t("source.conversation")
    ]);
    const sourceValues = [TODO_SOURCE.CALL, TODO_SOURCE.CUSTOMER, TODO_SOURCE.CONVERSATION];
    const sourceIndex = vue.ref(-1);
    const memberList = vue.ref([]);
    const memberOptions = vue.ref([]);
    const selectedMemberIndex = vue.ref(-1);
    const showCustomerModal = vue.ref(false);
    vue.ref("");
    const onSourceChange = (e) => {
      sourceIndex.value = parseInt(e.detail.value);
    };
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        memberList.value = data;
        memberOptions.value = data.map((m) => m.UserName || "Thành viên ẩn danh");
      } catch (error) {
        formatAppLog("error", "at controllers/create_todo.ts:69", "Lỗi lấy thành viên:", error);
        showError("Không thể tải danh sách thành viên");
      }
    };
    const openCustomerPopup = () => {
      showCustomerModal.value = true;
      fetchCustomers({});
    };
    const onCustomerFilter = (filterParams) => {
      fetchCustomers(filterParams);
    };
    const onCustomerSelect = (customer) => {
      form.value.customer = `${customer.name} - ${customer.phone}`;
      form.value.customerUid = customer.uid;
      showCustomerModal.value = false;
    };
    const onMemberChange = (e) => {
      const index = e.detail.value;
      selectedMemberIndex.value = index;
      const selectedMember = memberList.value[index];
      if (selectedMember) {
        form.value.assignee = selectedMember.memberUID;
      }
    };
    const currentAssigneeName = vue.computed(() => {
      if (selectedMemberIndex.value > -1 && memberOptions.value.length > 0) {
        return memberOptions.value[selectedMemberIndex.value];
      }
      return "";
    });
    const goBack = () => uni.navigateBack();
    const processDescriptionImages = async (htmlContent) => {
      if (!htmlContent)
        return { newContent: "", fileUrls: [] };
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      const promises = [];
      const replacements = [];
      const uploadedUrls = [];
      while ((match = imgRegex.exec(htmlContent)) !== null) {
        const src = match[1];
        if (!src.startsWith("http") && !src.startsWith("https")) {
          const uploadPromise = uploadTodoFile(src).then((serverUrl) => {
            replacements.push({ oldSrc: src, newSrc: serverUrl });
            uploadedUrls.push(serverUrl);
          }).catch((err) => {
            formatAppLog("error", "at controllers/create_todo.ts:121", `Upload ảnh ${src} lỗi:`, err);
          });
          promises.push(uploadPromise);
        }
      }
      if (promises.length > 0) {
        await Promise.all(promises);
      }
      let newHtml = htmlContent;
      replacements.forEach((rep) => {
        newHtml = newHtml.split(rep.oldSrc).join(rep.newSrc);
      });
      return { newContent: newHtml, fileUrls: uploadedUrls };
    };
    const submitForm = async () => {
      if (!form.value.name || !form.value.name.trim()) {
        showInfo(t("todo.validate_name"));
        return;
      }
      let selectedLink = "CALL";
      if (sourceIndex.value >= 0) {
        selectedLink = sourceValues[sourceIndex.value];
      }
      loading.value = true;
      showLoading(t("todo.upload_processing"));
      try {
        const { newContent, fileUrls } = await processDescriptionImages(form.value.desc);
        form.value.desc = newContent;
        const payload = buildCreateTodoPayload(form.value, {
          projectCode: PROJECT_CODE,
          uid: UID,
          link: selectedLink,
          uploadedFiles: fileUrls.length > 0 ? fileUrls[0] : ""
        });
        formatAppLog("log", "at controllers/create_todo.ts:163", "Payload Submit:", payload);
        await createTodo(payload);
        hideLoading();
        showSuccess(t("todo.create_success"));
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } catch (error) {
        hideLoading();
        formatAppLog("error", "at controllers/create_todo.ts:172", "Create Error:", error);
        const errorMsg = (error == null ? void 0 : error.message) || (typeof error === "string" ? error : "Thất bại");
        showError(t("common.error_load") + ": " + errorMsg);
      } finally {
        loading.value = false;
      }
    };
    vue.onMounted(() => {
      fetchMembers();
    });
    return {
      loading,
      form,
      memberOptions,
      onMemberChange,
      currentAssigneeName,
      showCustomerModal,
      loadingCustomer,
      customerList,
      openCustomerPopup,
      onCustomerSelect,
      goBack,
      submitForm,
      sourceOptions,
      sourceIndex,
      onSourceChange,
      memberList,
      onCustomerFilter,
      loadingMore,
      loadMoreCustomers
    };
  };
  const extractLinksAndCleanHtml = (html) => {
    if (!html)
      return { cleanHtml: "", links: [] };
    const links = [];
    const iframeRegex = /<iframe[^>]+src="([^">]+)"[^>]*><\/iframe>/g;
    const cleanHtml = html.replace(iframeRegex, (match, src) => {
      if (src)
        links.push(src);
      return "";
    });
    return { cleanHtml, links };
  };
  const composeHtmlWithIframes = (cleanHtml, links) => {
    let fullContent = cleanHtml;
    links.forEach((link) => {
      const iframeStr = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${link}"></iframe>`;
      fullContent += iframeStr;
    });
    return fullContent;
  };
  const getDomainFromUrl = (url) => {
    try {
      let tempUrl = url;
      if (!tempUrl.startsWith("http"))
        tempUrl = "http://" + tempUrl;
      const domain = new URL(tempUrl).hostname;
      return domain.replace("www.", "");
    } catch (e) {
      return "Liên kết ngoài";
    }
  };
  const openExternalLink = (url) => {
    if (!url)
      return;
    plus.runtime.openURL(url);
  };
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "LinkCard",
    props: {
      url: {
        type: String,
        required: true,
        default: ""
      },
      removable: {
        type: Boolean,
        default: false
      }
    },
    emits: ["remove"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const domainDisplay = vue.computed(() => getDomainFromUrl(props.url));
      const handleOpenLink = () => {
        openExternalLink(props.url);
      };
      const __returned__ = { props, emit, domainDisplay, handleOpenLink };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "link-card",
      onClick: vue.withModifiers($setup.handleOpenLink, ["stop"])
    }, [
      vue.createElementVNode("view", { class: "link-card-icon" }, [
        vue.createElementVNode("image", {
          src: "https://img.icons8.com/ios-filled/50/007aff/internet.png",
          class: "card-icon-img"
        })
      ]),
      vue.createElementVNode("view", { class: "link-card-content" }, [
        vue.createElementVNode(
          "text",
          { class: "link-domain" },
          vue.toDisplayString($setup.domainDisplay),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "link-url" },
          vue.toDisplayString($props.url),
          1
          /* TEXT */
        )
      ]),
      $props.removable ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "link-card-remove",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.$emit("remove"), ["stop"]))
      }, [
        vue.createElementVNode("text", { class: "remove-btn" }, "✕")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const LinkCard = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-fe26c08a"], ["__file", "D:/uni_app/vbot-todo-android-2/components/Todo/LinkCard.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "TodoEditor",
    props: {
      modelValue: String,
      placeholder: { type: String, default: "" }
    },
    emits: ["update:modelValue"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const { t } = useI18n();
      const props = __props;
      const emit = __emit;
      const tools = [
        { name: "header", iconText: "H", style: "font-weight:bold", action: "header-menu" },
        { name: "fontSize", iconText: "A", style: "font-weight:bold; font-size:16px", action: "fontsize-menu" },
        { name: "bold", iconText: "B", style: "font-weight:900" },
        { name: "italic", iconText: "I", style: "font-style:italic" },
        { name: "underline", iconText: "U", style: "text-decoration:underline" },
        { name: "color", iconImg: "https://img.icons8.com/ios-filled/50/000000/text-color.png", action: "color-picker" },
        { name: "backgroundColor", iconImg: "https://img.icons8.com/ios-filled/50/000000/marker-pen.png", action: "bgcolor-picker" },
        { name: "strike", iconText: "S", style: "text-decoration:line-through" },
        { name: "align", iconImg: "https://img.icons8.com/ios/50/666666/align-left.png", action: "align-menu" },
        { name: "list", value: "ordered", iconImg: "https://img.icons8.com/ios/50/666666/numbered-list.png" },
        { name: "list", value: "bullet", iconImg: "https://img.icons8.com/ios/50/666666/list.png" }
      ];
      const colorList = [
        "#000000",
        "#333333",
        "#888888",
        "#aaaaaa",
        "#e60000",
        "#ff9900",
        "#ffff00",
        "#008a00",
        "#0066cc",
        "#880088",
        "#ffffff",
        "#facccc",
        "#ffebcc",
        "#ffffcc",
        "#cce8cc",
        "#cce0f5"
      ];
      const editorId = vue.ref(`editor-${Math.random().toString(36).substr(2, 5)}`);
      const editorCtx = vue.ref(null);
      const formats = vue.ref({});
      const instance = vue.getCurrentInstance();
      const isLinkSelected = vue.ref(false);
      const lastVal = vue.ref("");
      const showLinkModal = vue.ref(false);
      const linkUrl = vue.ref("");
      const showCardLinkModal = vue.ref(false);
      const cardLinkUrl = vue.ref("");
      const showColorModal = vue.ref(false);
      const colorTab = vue.ref("color");
      const insertedLinks = vue.ref([]);
      const showActionSheet = vue.ref(false);
      const currentActionSheetItems = vue.ref([]);
      const getDomain = (url) => {
        try {
          const domain = new URL(url).hostname;
          return domain.replace("www.", "");
        } catch (e) {
          return "Website";
        }
      };
      const openLink = (url) => {
        plus.runtime.openURL(url);
      };
      const parseContent = (html) => {
        if (!html)
          return { cleanHtml: "", links: [] };
        const links = [];
        const iframeRegex = /<iframe[^>]+src="([^">]+)"[^>]*><\/iframe>/g;
        const cleanHtml = html.replace(iframeRegex, (match, src) => {
          if (src)
            links.push(src);
          return "";
        });
        return { cleanHtml, links };
      };
      const composeContent = (cleanHtml, links) => {
        let fullContent = cleanHtml;
        links.forEach((link) => {
          const iframeStr = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${link}"></iframe>`;
          fullContent += iframeStr;
        });
        return fullContent;
      };
      const openCardLinkModal = () => {
        cardLinkUrl.value = "";
        showCardLinkModal.value = true;
      };
      const confirmCardLink = () => {
        if (cardLinkUrl.value) {
          let url = cardLinkUrl.value.trim();
          if (!url.startsWith("http")) {
            url = "https://" + url;
          }
          insertedLinks.value.push(url);
          triggerUpdate();
        }
        showCardLinkModal.value = false;
      };
      const removeLink = (index) => {
        insertedLinks.value.splice(index, 1);
        triggerUpdate();
      };
      const triggerUpdate = () => {
        if (editorCtx.value) {
          editorCtx.value.getContents({
            success: (res) => {
              const html = res.html;
              lastVal.value = html;
              const finalContent = composeHtmlWithIframes(html, insertedLinks.value);
              emit("update:modelValue", finalContent);
            }
          });
        }
      };
      const getDisplayText = (item) => {
        const formatVal = formats.value[item.name];
        if (item.action === "header-menu")
          return formatVal ? `H${formatVal}` : "H";
        if (item.action === "fontsize-menu") {
          if (formatVal === "small")
            return "Sm";
          if (formatVal === "large")
            return "Lg";
          if (formatVal === "huge")
            return "Hg";
          return "A";
        }
        return item.iconText;
      };
      const getDisplayImage = (item) => {
        if (item.action === "align-menu") {
          const alignVal = formats.value.align || "left";
          switch (alignVal) {
            case "center":
              return "https://img.icons8.com/ios/50/666666/align-center.png";
            case "right":
              return "https://img.icons8.com/ios/50/666666/align-right.png";
            case "justify":
              return "https://img.icons8.com/ios/50/666666/align-justify.png";
            default:
              return "https://img.icons8.com/ios/50/666666/align-left.png";
          }
        }
        return item.iconImg;
      };
      const isActive = (item) => {
        const currentFormat = formats.value[item.name];
        if (item.action === "header-menu")
          return !!currentFormat;
        if (item.action === "fontsize-menu")
          return !!currentFormat;
        if (item.action === "align-menu")
          return !!currentFormat && currentFormat !== "left";
        if (item.name === "color")
          return !!formats.value.color;
        if (item.name === "backgroundColor")
          return !!formats.value.backgroundColor;
        if (item.value)
          return currentFormat === item.value;
        return !!currentFormat;
      };
      const closeActionSheet = () => {
        showActionSheet.value = false;
      };
      const handleActionSheetItemClick = (item) => {
        item.handler();
        closeActionSheet();
      };
      const handleToolClick = (item) => {
        if (item.action === "header-menu")
          return handleHeaderSetting();
        if (item.action === "fontsize-menu")
          return handleFontSizeSetting();
        if (item.action === "align-menu")
          return handleAlignSetting();
        if (item.action === "color-picker") {
          colorTab.value = "color";
          showColorModal.value = true;
          return;
        }
        if (item.action === "bgcolor-picker") {
          colorTab.value = "backgroundColor";
          showColorModal.value = true;
          return;
        }
        format2(item.name, item.value);
      };
      const handleAlignSetting = () => {
        currentActionSheetItems.value = [
          { text: t("editor.align_left"), handler: () => format2("align", "left") },
          { text: t("editor.align_center"), handler: () => format2("align", "center") },
          { text: t("editor.align_right"), handler: () => format2("align", "right") },
          { text: t("editor.align_justify"), handler: () => format2("align", "justify") }
        ];
        showActionSheet.value = true;
      };
      const handleFontSizeSetting = () => {
        currentActionSheetItems.value = [
          { text: t("editor.size_small"), handler: () => format2("fontSize", "small") },
          { text: t("editor.size_normal"), handler: () => format2("fontSize", null) },
          { text: t("editor.size_large"), handler: () => format2("fontSize", "large") },
          { text: t("editor.size_huge"), handler: () => format2("fontSize", "huge") }
        ];
        showActionSheet.value = true;
      };
      const handleHeaderSetting = () => {
        currentActionSheetItems.value = [
          { text: "Heading 1", handler: () => format2("header", 1) },
          { text: "Heading 2", handler: () => format2("header", 2) },
          { text: "Heading 3", handler: () => format2("header", 3) },
          { text: "Heading 4", handler: () => format2("header", 4) },
          { text: t("editor.size_normal"), handler: () => format2("header", null) }
        ];
        showActionSheet.value = true;
      };
      const insertImage = () => {
        currentActionSheetItems.value = [
          {
            text: t("editor.img_camera"),
            handler: () => {
              uni.chooseImage({
                count: 1,
                sourceType: ["camera"],
                success: (imageRes) => processImageSelection(imageRes)
              });
            }
          },
          {
            text: t("editor.img_album"),
            handler: () => {
              uni.chooseImage({
                count: 1,
                sourceType: ["album"],
                success: (imageRes) => processImageSelection(imageRes)
              });
            }
          }
        ];
        showActionSheet.value = true;
      };
      const processImageSelection = (imageRes) => {
        const tempPath = imageRes.tempFilePaths[0];
        if (editorCtx.value) {
          editorCtx.value.insertImage({
            src: tempPath,
            width: "80%",
            alt: "image"
          });
        }
      };
      const onEditorReady = () => {
        uni.createSelectorQuery().in(instance).select(`#${editorId.value}`).context((res) => {
          if (res && res.context) {
            editorCtx.value = res.context;
            if (props.modelValue) {
              const { cleanHtml, links } = extractLinksAndCleanHtml(props.modelValue);
              insertedLinks.value = links;
              editorCtx.value.setContents({ html: cleanHtml });
              lastVal.value = cleanHtml;
            }
          }
        }).exec();
      };
      const onInput = (e) => {
        const val = e.detail.html;
        lastVal.value = val;
        const finalContent = composeHtmlWithIframes(val, insertedLinks.value);
        emit("update:modelValue", finalContent);
      };
      const onStatusChange = (e) => {
        formats.value = e.detail;
        isLinkSelected.value = !!e.detail.link;
      };
      const format2 = (name, value = null) => {
        if (!editorCtx.value)
          return;
        editorCtx.value.format(name, value);
      };
      const applyColor = (color) => {
        if (color) {
          format2(colorTab.value, color);
        } else {
          format2(colorTab.value, null);
        }
        showColorModal.value = false;
      };
      const closeColorModal = () => {
        showColorModal.value = false;
      };
      const isColorSelected = (color) => {
        return formats.value[colorTab.value] === color;
      };
      const handleLink = () => {
        if (isLinkSelected.value) {
          editorCtx.value.format("link", null);
        } else {
          linkUrl.value = "";
          showLinkModal.value = true;
        }
      };
      const confirmLink = () => {
        if (linkUrl.value) {
          editorCtx.value.format("link", linkUrl.value);
        }
        showLinkModal.value = false;
      };
      const clearFormat = () => {
        editorCtx.value.removeFormat();
      };
      vue.watch(() => props.modelValue, (newVal) => {
        if (editorCtx.value) {
          const { cleanHtml, links } = extractLinksAndCleanHtml(newVal || "");
          if (cleanHtml !== lastVal.value) {
            editorCtx.value.setContents({ html: cleanHtml });
            lastVal.value = cleanHtml;
          }
          if (JSON.stringify(links) !== JSON.stringify(insertedLinks.value)) {
            insertedLinks.value = links;
          }
        }
      });
      const __returned__ = { t, props, emit, tools, colorList, editorId, editorCtx, formats, instance, isLinkSelected, lastVal, showLinkModal, linkUrl, showCardLinkModal, cardLinkUrl, showColorModal, colorTab, insertedLinks, showActionSheet, currentActionSheetItems, getDomain, openLink, parseContent, composeContent, openCardLinkModal, confirmCardLink, removeLink, triggerUpdate, getDisplayText, getDisplayImage, isActive, closeActionSheet, handleActionSheetItemClick, handleToolClick, handleAlignSetting, handleFontSizeSetting, handleHeaderSetting, insertImage, processImageSelection, onEditorReady, onInput, onStatusChange, format: format2, applyColor, closeColorModal, isColorSelected, handleLink, confirmLink, clearFormat, LinkCard };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "editor-container" }, [
      vue.createElementVNode("editor", {
        id: $setup.editorId,
        class: "ql-container",
        placeholder: $props.placeholder || _ctx.$t("editor.placeholder"),
        "show-img-size": "",
        "show-img-toolbar": "",
        "show-img-resize": "",
        onReady: $setup.onEditorReady,
        onInput: $setup.onInput,
        onStatuschange: $setup.onStatusChange
      }, null, 40, ["id", "placeholder"]),
      $setup.insertedLinks.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "link-cards-area"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.insertedLinks, (link, index) => {
            return vue.openBlock(), vue.createBlock($setup["LinkCard"], {
              key: index,
              url: link,
              removable: true,
              onRemove: ($event) => $setup.removeLink(index)
            }, null, 8, ["url", "onRemove"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "toolbar" }, [
        vue.createElementVNode("view", { class: "tool-list" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tools, (item, index) => {
              return vue.createElementVNode("view", {
                key: index,
                class: vue.normalizeClass(["tool-item", { "active": $setup.isActive(item) }]),
                onTouchend: vue.withModifiers(($event) => $setup.handleToolClick(item), ["prevent"])
              }, [
                item.iconText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    style: vue.normalizeStyle(item.style),
                    class: vue.normalizeClass(["txt-icon", { "txt-dynamic": item.action }])
                  },
                  vue.toDisplayString($setup.getDisplayText(item)),
                  7
                  /* TEXT, CLASS, STYLE */
                )) : (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  src: $setup.getDisplayImage(item),
                  class: "img-icon"
                }, null, 8, ["src"]))
              ], 42, ["onTouchend"]);
            }),
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createElementVNode("view", { class: "tool-divider" }),
          vue.createElementVNode(
            "view",
            {
              class: "tool-item",
              onTouchend: vue.withModifiers($setup.insertImage, ["prevent"])
            },
            [
              vue.createElementVNode("image", {
                src: "https://img.icons8.com/ios/50/666666/image.png",
                class: "img-icon"
              })
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["tool-item", { "active": $setup.isLinkSelected }]),
              onTouchend: vue.withModifiers($setup.handleLink, ["prevent"])
            },
            [
              vue.createElementVNode("image", {
                src: "https://img.icons8.com/ios/50/666666/link--v1.png",
                class: "img-icon"
              })
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "tool-item",
              onTouchend: vue.withModifiers($setup.openCardLinkModal, ["prevent"])
            },
            [
              vue.createElementVNode("image", {
                src: "https://img.icons8.com/ios/50/666666/add-link.png",
                class: "img-icon"
              })
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "tool-item",
              onTouchend: vue.withModifiers($setup.clearFormat, ["prevent"])
            },
            [
              vue.createElementVNode("text", {
                class: "txt-icon",
                style: { "font-size": "12px" }
              }, "Clear")
            ],
            32
            /* NEED_HYDRATION */
          )
        ])
      ]),
      $setup.showLinkModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: _cache[3] || (_cache[3] = ($event) => $setup.showLinkModal = false)
      }, [
        vue.createElementVNode("view", {
          class: "modal-box",
          onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode(
            "text",
            { class: "modal-title" },
            vue.toDisplayString(_ctx.$t("editor.link_modal_title")),
            1
            /* TEXT */
          ),
          vue.withDirectives(vue.createElementVNode("input", {
            class: "modal-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.linkUrl = $event),
            placeholder: "https://example.com",
            focus: $setup.showLinkModal
          }, null, 8, ["focus"]), [
            [vue.vModelText, $setup.linkUrl]
          ]),
          vue.createElementVNode("view", { class: "modal-actions" }, [
            vue.createElementVNode(
              "button",
              {
                class: "btn-cancel",
                onClick: _cache[1] || (_cache[1] = ($event) => $setup.showLinkModal = false)
              },
              vue.toDisplayString(_ctx.$t("common.cancel")),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "button",
              {
                class: "btn-confirm",
                onClick: $setup.confirmLink
              },
              vue.toDisplayString(_ctx.$t("common.confirm")),
              1
              /* TEXT */
            )
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $setup.showCardLinkModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "modal-overlay",
        onClick: _cache[7] || (_cache[7] = ($event) => $setup.showCardLinkModal = false)
      }, [
        vue.createElementVNode("view", {
          class: "modal-box",
          onClick: _cache[6] || (_cache[6] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode(
            "text",
            { class: "modal-title" },
            vue.toDisplayString(_ctx.$t("editor.card_modal_title")),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "modal-desc" },
            vue.toDisplayString(_ctx.$t("editor.card_modal_desc")),
            1
            /* TEXT */
          ),
          vue.withDirectives(vue.createElementVNode("input", {
            class: "modal-input",
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.cardLinkUrl = $event),
            placeholder: "https://youtube.com/...",
            focus: $setup.showCardLinkModal
          }, null, 8, ["focus"]), [
            [vue.vModelText, $setup.cardLinkUrl]
          ]),
          vue.createElementVNode("view", { class: "modal-actions" }, [
            vue.createElementVNode(
              "button",
              {
                class: "btn-cancel",
                onClick: _cache[5] || (_cache[5] = ($event) => $setup.showCardLinkModal = false)
              },
              vue.toDisplayString(_ctx.$t("common.cancel")),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "button",
              {
                class: "btn-confirm",
                onClick: $setup.confirmCardLink
              },
              vue.toDisplayString(_ctx.$t("common.confirm")),
              1
              /* TEXT */
            )
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $setup.showColorModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: "modal-overlay",
        onClick: $setup.closeColorModal
      }, [
        vue.createElementVNode("view", {
          class: "modal-box color-box",
          onClick: _cache[11] || (_cache[11] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "color-tabs" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["color-tab", { active: $setup.colorTab === "color" }]),
                onClick: _cache[8] || (_cache[8] = ($event) => $setup.colorTab = "color")
              },
              vue.toDisplayString(_ctx.$t("editor.color_text")),
              3
              /* TEXT, CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["color-tab", { active: $setup.colorTab === "backgroundColor" }]),
                onClick: _cache[9] || (_cache[9] = ($event) => $setup.colorTab = "backgroundColor")
              },
              vue.toDisplayString(_ctx.$t("editor.color_bg")),
              3
              /* TEXT, CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "color-grid" }, [
            vue.createElementVNode("view", {
              class: "color-circle no-color",
              onClick: _cache[10] || (_cache[10] = ($event) => $setup.applyColor(""))
            }, [
              vue.createElementVNode("text", { class: "x-mark" }, "✕")
            ]),
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.colorList, (c, idx) => {
                return vue.createElementVNode("view", {
                  key: idx,
                  class: vue.normalizeClass(["color-circle", { selected: $setup.isColorSelected(c) }]),
                  style: vue.normalizeStyle({ backgroundColor: c }),
                  onClick: ($event) => $setup.applyColor(c)
                }, null, 14, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["custom-sheet-mask", { "show": $setup.showActionSheet }]),
          onClick: $setup.closeActionSheet
        },
        [
          vue.createElementVNode("view", {
            class: "custom-sheet-panel",
            onClick: _cache[12] || (_cache[12] = vue.withModifiers(() => {
            }, ["stop"]))
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.currentActionSheetItems, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "sheet-item",
                  onClick: ($event) => $setup.handleActionSheetItemClick(item)
                }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.text),
                    1
                    /* TEXT */
                  )
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode("view", { class: "sheet-gap" }),
            vue.createElementVNode("view", {
              class: "sheet-item cancel",
              onClick: $setup.closeActionSheet
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(_ctx.$t("common.cancel")),
                1
                /* TEXT */
              )
            ])
          ])
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const TodoEditor = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-7d79903f"], ["__file", "D:/uni_app/vbot-todo-android-2/components/Todo/TodoEditor.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "TodoDatePicker",
    props: {
      dueDate: { type: String, required: true },
      notifyAt: { type: String, required: true }
    },
    emits: ["update:dueDate", "update:notifyAt", "change"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const { t } = useI18n();
      const onDueDateChange = (val) => {
        emit("update:dueDate", val);
        emit("change", { field: "dueDate", value: val });
      };
      const onNotifyDateChange = (val) => {
        emit("update:notifyAt", val);
        emit("change", { field: "notifyAt", value: val });
      };
      const formatDateTimeDisplay = (isoStr) => {
        if (!isoStr)
          return "";
        try {
          const dateObj = new Date(isoStr.replace(/-/g, "/"));
          if (isNaN(dateObj.getTime()))
            return isoStr;
          const d = dateObj.getDate().toString().padStart(2, "0");
          const m = (dateObj.getMonth() + 1).toString().padStart(2, "0");
          const y = dateObj.getFullYear();
          const h = dateObj.getHours().toString().padStart(2, "0");
          const min = dateObj.getMinutes().toString().padStart(2, "0");
          return `${d}/${m}/${y} ${h}:${min}`;
        } catch (e) {
          return isoStr;
        }
      };
      const __returned__ = { props, emit, t, onDueDateChange, onNotifyDateChange, formatDateTimeDisplay };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "flat-item date-compound-block" }, [
      vue.createElementVNode("view", { class: "item-left icon-top-aligned" }, [
        vue.createElementVNode("image", {
          src: "https://img.icons8.com/ios/50/666666/clock--v1.png",
          class: "item-icon"
        })
      ]),
      vue.createElementVNode("view", { class: "right-column" }, [
        vue.createElementVNode("view", { class: "date-row" }, [
          vue.createVNode(_component_uni_datetime_picker, {
            type: "datetime",
            value: $props.dueDate,
            "hide-second": true,
            border: false,
            onChange: $setup.onDueDateChange,
            class: "full-width-picker"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["item-picker", { "placeholder-color": !$props.dueDate }])
                },
                [
                  vue.createElementVNode(
                    "text",
                    { class: "picker-label" },
                    vue.toDisplayString(_ctx.$t("todo.due_date_label")),
                    1
                    /* TEXT */
                  ),
                  vue.createTextVNode(
                    " " + vue.toDisplayString($props.dueDate ? $setup.formatDateTimeDisplay($props.dueDate) : _ctx.$t("todo.select_date")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["value"])
        ]),
        vue.createElementVNode("view", { class: "inner-divider" }),
        vue.createElementVNode("view", { class: "date-row" }, [
          vue.createVNode(_component_uni_datetime_picker, {
            type: "datetime",
            value: $props.notifyAt,
            "hide-second": true,
            border: false,
            onChange: $setup.onNotifyDateChange,
            class: "full-width-picker"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["item-picker", { "placeholder-color": !$props.notifyAt }])
                },
                [
                  vue.createElementVNode(
                    "text",
                    { class: "picker-label" },
                    vue.toDisplayString(_ctx.$t("todo.notify_date_label")),
                    1
                    /* TEXT */
                  ),
                  vue.createTextVNode(
                    " " + vue.toDisplayString($props.notifyAt ? $setup.formatDateTimeDisplay($props.notifyAt) : _ctx.$t("todo.select_date")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["value"])
        ])
      ])
    ]);
  }
  const TodoDatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-245edb6a"], ["__file", "D:/uni_app/vbot-todo-android-2/components/Todo/TodoDatePicker.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "create_todo",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        loading,
        form,
        goBack,
        submitForm,
        memberOptions,
        onMemberChange,
        currentAssigneeName,
        showCustomerModal,
        loadingCustomer,
        customerList,
        openCustomerPopup,
        onCustomerSelect,
        sourceOptions,
        sourceIndex,
        onSourceChange,
        memberList,
        onCustomerFilter,
        loadingMore,
        loadMoreCustomers
      } = useCreateTodoController();
      const __returned__ = { loading, form, goBack, submitForm, memberOptions, onMemberChange, currentAssigneeName, showCustomerModal, loadingCustomer, customerList, openCustomerPopup, onCustomerSelect, sourceOptions, sourceIndex, onSourceChange, memberList, onCustomerFilter, loadingMore, loadMoreCustomers, TodoEditor, TodoDatePicker, CustomerModal, AppButton, GlobalMessage };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "flat-item" }, [
        vue.createElementVNode("view", { class: "item-left" }, [
          vue.createElementVNode("image", {
            src: "https://img.icons8.com/ios/50/666666/edit--v1.png",
            class: "item-icon"
          })
        ]),
        vue.withDirectives(vue.createElementVNode("textarea", {
          class: "item-input title-textarea",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.name = $event),
          placeholder: _ctx.$t("todo.enter_task_name"),
          maxlength: "256",
          "auto-height": ""
        }, null, 8, ["placeholder"]), [
          [vue.vModelText, $setup.form.name]
        ]),
        vue.createElementVNode(
          "text",
          { class: "char-count" },
          vue.toDisplayString(_ctx.$t("todo.char_count").replace("{current}", String($setup.form.name ? $setup.form.name.length : 0)).replace("{max}", "256")),
          1
          /* TEXT */
        )
      ]),
      vue.createVNode($setup["TodoEditor"], {
        modelValue: $setup.form.desc,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.desc = $event),
        placeholder: _ctx.$t("editor.placeholder")
      }, null, 8, ["modelValue", "placeholder"]),
      vue.createElementVNode("view", {
        class: "flat-item",
        onClick: _cache[2] || (_cache[2] = (...args) => $setup.openCustomerPopup && $setup.openCustomerPopup(...args))
      }, [
        vue.createElementVNode("view", { class: "item-left" }, [
          vue.createElementVNode("image", {
            src: "https://img.icons8.com/ios/50/666666/price-tag.png",
            class: "item-icon"
          })
        ]),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["input-trigger", { "placeholder": !$setup.form.customer }])
          },
          vue.toDisplayString($setup.form.customer || _ctx.$t("todo.select_customer")),
          3
          /* TEXT, CLASS */
        ),
        vue.createElementVNode("text", { class: "arrow-icon" }, "›")
      ]),
      vue.createVNode($setup["CustomerModal"], {
        visible: $setup.showCustomerModal,
        loading: $setup.loadingCustomer,
        loadingMore: $setup.loadingMore,
        customers: $setup.customerList,
        managers: $setup.memberList,
        onClose: _cache[3] || (_cache[3] = ($event) => $setup.showCustomerModal = false),
        onSelect: $setup.onCustomerSelect,
        onFilter: $setup.onCustomerFilter,
        onLoadMore: $setup.loadMoreCustomers
      }, null, 8, ["visible", "loading", "loadingMore", "customers", "managers", "onSelect", "onFilter", "onLoadMore"]),
      vue.createElementVNode("view", { class: "flat-item" }, [
        vue.createElementVNode("view", { class: "item-left" }, [
          vue.createElementVNode("image", {
            src: "https://img.icons8.com/ios/50/666666/internet.png",
            class: "item-icon"
          })
        ]),
        vue.createElementVNode("picker", {
          mode: "selector",
          range: $setup.sourceOptions,
          onChange: _cache[4] || (_cache[4] = (...args) => $setup.onSourceChange && $setup.onSourceChange(...args)),
          class: "full-width-picker"
        }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["picker-display", { "placeholder-color": $setup.sourceIndex === -1 }])
            },
            vue.toDisplayString($setup.sourceIndex > -1 ? $setup.sourceOptions[$setup.sourceIndex] : _ctx.$t("todo.select_source")),
            3
            /* TEXT, CLASS */
          )
        ], 40, ["range"]),
        vue.createElementVNode("text", { class: "arrow-icon" }, "›")
      ]),
      vue.createElementVNode("view", { class: "flat-item" }, [
        vue.createElementVNode("view", { class: "item-left" }, [
          vue.createElementVNode("image", {
            src: "https://img.icons8.com/ios/50/666666/user.png",
            class: "item-icon"
          })
        ]),
        vue.createElementVNode("picker", {
          mode: "selector",
          range: $setup.memberOptions,
          onChange: _cache[5] || (_cache[5] = (...args) => $setup.onMemberChange && $setup.onMemberChange(...args)),
          class: "full-width-picker"
        }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["picker-display", { "placeholder-color": !$setup.currentAssigneeName }])
            },
            vue.toDisplayString($setup.currentAssigneeName ? $setup.currentAssigneeName : _ctx.$t("todo.assignee")),
            3
            /* TEXT, CLASS */
          )
        ], 40, ["range"])
      ]),
      vue.createVNode($setup["TodoDatePicker"], {
        dueDate: $setup.form.dueDate,
        "onUpdate:dueDate": _cache[6] || (_cache[6] = ($event) => $setup.form.dueDate = $event),
        notifyAt: $setup.form.notifyAt,
        "onUpdate:notifyAt": _cache[7] || (_cache[7] = ($event) => $setup.form.notifyAt = $event)
      }, null, 8, ["dueDate", "notifyAt"]),
      vue.createElementVNode("view", { class: "footer-action" }, [
        vue.createVNode($setup["AppButton"], {
          type: "secondary",
          label: _ctx.$t("common.cancel_action"),
          class: "btn-cancel",
          onClick: $setup.goBack
        }, null, 8, ["label", "onClick"]),
        vue.createVNode($setup["AppButton"], {
          type: "primary",
          label: $setup.loading ? _ctx.$t("common.saving") : _ctx.$t("common.save"),
          loading: $setup.loading,
          class: "btn-submit",
          onClick: $setup.submitForm
        }, null, 8, ["label", "loading", "onClick"])
      ]),
      vue.createVNode($setup["GlobalMessage"])
    ]);
  }
  const PagesTodoCreateTodo = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/uni_app/vbot-todo-android-2/pages/todo/create_todo.vue"]]);
  const timestampToDateTimeStr = (ts) => {
    if (!ts || ts <= 0)
      return "";
    try {
      const date = new Date(ts);
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, "0");
      const d = date.getDate().toString().padStart(2, "0");
      const h = date.getHours().toString().padStart(2, "0");
      const min = date.getMinutes().toString().padStart(2, "0");
      const sec = "00";
      return `${y}-${m}-${d} ${h}:${min}:${sec}`;
    } catch {
      return "";
    }
  };
  const mapTodoDetailToForm = (apiData) => {
    if (!apiData)
      return null;
    const statusMap = [TODO_STATUS.NEW, TODO_STATUS.IN_PROGRESS, TODO_STATUS.DONE];
    let sIndex = statusMap.indexOf(apiData.status);
    if (sIndex === -1)
      sIndex = 0;
    const sourceMap = [TODO_SOURCE.CALL, TODO_SOURCE.CUSTOMER, TODO_SOURCE.CONVERSATION, TODO_SOURCE.CHAT_MESSAGE];
    let srcIndex = sourceMap.indexOf(apiData.links);
    if (srcIndex === -1)
      srcIndex = 0;
    apiData.notificationReceivedAt || 0;
    return {
      id: apiData.id,
      title: apiData.title || "",
      code: apiData.code || "",
      desc: apiData.description || "",
      statusIndex: sIndex,
      sourceIndex: srcIndex,
      assigneeIndex: 0,
      assigneeId: apiData.assigneeId || "",
      dueDate: timestampToDateTimeStr(apiData.dueDate),
      notifyAt: timestampToDateTimeStr(apiData.notificationReceivedAt),
      customerCode: apiData.customerCode || "",
      customerName: "",
      customerNameLabel: "Tên khách hàng",
      customerPhone: "",
      customerPhoneLabel: "Số điện thoại",
      customerManagerName: "",
      raw: apiData
    };
  };
  const useTodoDetailController = () => {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const currentUserId = authStore.uid;
    const isLoading = vue.ref(false);
    const isLoadingCustomer = vue.ref(false);
    const isLoadingHistory = vue.ref(false);
    const historyList = vue.ref([]);
    const isHistoryOpen = vue.ref(false);
    const comments = vue.ref([]);
    const isLoadingComments = vue.ref(false);
    const newCommentText = vue.ref("");
    const isSubmittingComment = vue.ref(false);
    const isConfirmDeleteCommentOpen = vue.ref(false);
    const commentToDeleteId = vue.ref(null);
    const isEditingComment = vue.ref(false);
    const editingMemberName = vue.ref("");
    const isConfirmCancelEditOpen = vue.ref(false);
    const isReplying = vue.ref(false);
    const isConfirmCancelReplyOpen = vue.ref(false);
    const replyingCommentData = vue.ref(null);
    const replyingMemberName = vue.ref("");
    const isEmojiPickerOpen = vue.ref(false);
    const currentReactingComment = vue.ref(null);
    const emojiList = ["👍", "👎", "😍", "😆", "😱", "😭", "😤"];
    const commentFilterIndex = vue.ref(0);
    const commentFilterOptions = vue.computed(() => [
      t("todo.filter_activity_all"),
      t("todo.filter_activity_comment")
    ]);
    const commentFilterValues = ["", "COMMENT"];
    const isSavingDescription = vue.ref(false);
    const replyingMessagePreview = vue.ref("");
    const toggleHistory = () => {
      isHistoryOpen.value = !isHistoryOpen.value;
    };
    const convertDateTimeToTimestamp = (dateTimeStr) => {
      if (!dateTimeStr)
        return 0;
      try {
        const safeStr = dateTimeStr.replace(/-/g, "/");
        return new Date(safeStr).getTime();
      } catch {
        return 0;
      }
    };
    const isStatusDisabled = vue.computed(() => {
      if (!form.value.raw)
        return true;
      return form.value.raw.status === "DONE";
    });
    const onDateUpdate = async (event) => {
      if (!form.value.raw)
        return;
      isLoading.value = true;
      try {
        const payload = {
          ...form.value.raw,
          preFixCode: "TODO",
          description: form.value.desc,
          files: "",
          tagCodes: "",
          title: form.value.title || form.value.raw.title
        };
        const ts = convertDateTimeToTimestamp(event.value);
        if (event.field === "dueDate") {
          payload.dueDate = ts;
        } else if (event.field === "notifyAt") {
          payload.notificationReceivedAt = ts;
        }
        formatAppLog("log", "at controllers/todo_detail.ts:122", `Payload Update ${event.field}:`, payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess(t("todo.msg_update_success"));
          if (event.field === "dueDate") {
            form.value.raw.dueDate = payload.dueDate;
            form.value.dueDate = event.value;
          } else {
            form.value.raw.notificationReceivedAt = payload.notificationReceivedAt;
            form.value.notifyAt = event.value;
          }
          if (form.value.customerCode)
            await fetchHistoryLog(form.value.customerCode);
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:141", "Lỗi cập nhật ngày:", error);
        showError(t("todo.msg_update_error"));
      } finally {
        isLoading.value = false;
      }
    };
    const processCommentInput = async (htmlContent) => {
      if (!htmlContent)
        return { cleanMessage: "", fileUrl: "" };
      const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
      let match;
      let fileUrl = "";
      let cleanMessage = htmlContent;
      const uploadPromises = [];
      while ((match = imgRegex.exec(htmlContent)) !== null) {
        const fullImgTag = match[0];
        const src = match[1];
        cleanMessage = cleanMessage.replace(fullImgTag, "");
        if (!src.startsWith("http") && !src.startsWith("https")) {
          const p = uploadTodoFile(src).then((serverUrl) => serverUrl).catch((err) => {
            formatAppLog("error", "at controllers/todo_detail.ts:168", "Upload ảnh bình luận lỗi:", err);
            return "";
          });
          uploadPromises.push(p);
        } else {
          fileUrl = src;
        }
      }
      if (uploadPromises.length > 0) {
        const results = await Promise.all(uploadPromises);
        const successfulUrl = results.find((u) => u !== "");
        if (successfulUrl) {
          fileUrl = successfulUrl;
        }
      }
      cleanMessage = cleanMessage.trim();
      return { cleanMessage, fileUrl };
    };
    const processDescriptionImages = async (htmlContent) => {
      if (!htmlContent)
        return { newContent: "", fileUrls: [] };
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      const promises = [];
      const replacements = [];
      const uploadedUrls = [];
      while ((match = imgRegex.exec(htmlContent)) !== null) {
        const src = match[1];
        if (!src.startsWith("http") && !src.startsWith("https")) {
          const uploadPromise = uploadTodoFile(src).then((serverUrl) => {
            replacements.push({ oldSrc: src, newSrc: serverUrl });
            uploadedUrls.push(serverUrl);
          }).catch((err) => {
            formatAppLog("error", "at controllers/todo_detail.ts:208", `Upload ảnh detail lỗi:`, err);
          });
          promises.push(uploadPromise);
        }
      }
      if (promises.length > 0) {
        await Promise.all(promises);
      }
      let newHtml = htmlContent;
      replacements.forEach((rep) => {
        newHtml = newHtml.split(rep.oldSrc).join(rep.newSrc);
      });
      return { newContent: newHtml, fileUrls: uploadedUrls };
    };
    const onSaveDescription = async () => {
      if (!form.value.raw) {
        showError(t("common.error_missing_data"));
        return;
      }
      isSavingDescription.value = true;
      try {
        const { newContent, fileUrls } = await processDescriptionImages(form.value.desc);
        form.value.desc = newContent;
        const filesString = fileUrls.length > 0 ? fileUrls.join(",") : "";
        const payload = {
          ...form.value.raw,
          preFixCode: "TODO",
          description: form.value.desc,
          files: filesString,
          tagCodes: "",
          title: form.value.title || form.value.raw.title
        };
        formatAppLog("log", "at controllers/todo_detail.ts:252", "Payload Update Description:", payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess(t("todo.msg_desc_saved"));
          form.value.raw.description = form.value.desc;
          if (filesString) {
            form.value.raw.files = filesString;
          }
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:267", "Lỗi cập nhật công việc:", error);
        showError(t("common.error_update"));
      } finally {
        isSavingDescription.value = false;
      }
    };
    const onSaveTitle = async () => {
      if (!form.value.raw)
        return;
      const newTitle = form.value.title ? form.value.title.trim() : "";
      const oldTitle = form.value.raw.title;
      if (!newTitle) {
        showInfo(t("todo.msg_title_empty"));
        form.value.title = oldTitle;
        return;
      }
      if (newTitle === oldTitle)
        return;
      isLoading.value = true;
      try {
        const payload = {
          ...form.value.raw,
          title: newTitle,
          preFixCode: "TODO",
          description: form.value.raw.description,
          files: form.value.raw.files || "",
          tagCodes: form.value.raw.tagCodes || ""
        };
        formatAppLog("log", "at controllers/todo_detail.ts:302", "Payload Update Title:", payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess(t("todo.msg_title_changed"));
          form.value.raw.title = newTitle;
          if (form.value.customerCode) {
            await fetchHistoryLog(form.value.customerCode);
          }
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:317", "Lỗi cập nhật tiêu đề:", error);
        showError(t("todo.msg_update_error"));
        form.value.title = oldTitle;
      } finally {
        isLoading.value = false;
      }
    };
    const onRequestReply = async (item) => {
      isEditingComment.value = false;
      editingCommentData.value = null;
      newCommentText.value = "";
      replyingCommentData.value = item;
      const rawMsg = item.message || "";
      const { cleanHtml } = extractLinksAndCleanHtml(rawMsg);
      replyingMessagePreview.value = cleanHtml;
      isReplying.value = true;
      const senderId = item.senderId;
      const foundMember = memberList.value.find((m) => m.UID === senderId);
      if (foundMember) {
        replyingMemberName.value = foundMember.UserName;
      } else {
        replyingMemberName.value = t("todo.user_hidden");
      }
      await vue.nextTick();
    };
    const onCancelReply = () => {
      if (!newCommentText.value.trim()) {
        confirmCancelReply();
      } else {
        isConfirmCancelReplyOpen.value = true;
      }
    };
    const confirmCancelReply = () => {
      isConfirmCancelReplyOpen.value = false;
      resetReplyState();
    };
    const continueReplying = () => {
      isConfirmCancelReplyOpen.value = false;
    };
    const submitReply = async () => {
      if ((!newCommentText.value || !newCommentText.value.trim()) && !newCommentText.value.includes("<img")) {
        showInfo(t("todo.msg_empty_content"));
        return;
      }
      if (!replyingCommentData.value)
        return;
      isSubmittingComment.value = true;
      try {
        const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);
        const todoId = form.value.id;
        const senderId = authStore.uid;
        let apiParentId = replyingCommentData.value.id;
        if (replyingCommentData.value.rootParentId) {
          apiParentId = replyingCommentData.value.rootParentId;
        }
        const payload = {
          todoId,
          senderId,
          message: cleanMessage,
          files: fileUrl,
          parentId: apiParentId
        };
        const newReplyId = await createTodoMessage(payload);
        if (newReplyId) {
          showSuccess(t("todo.msg_reply_success"));
          const newReplyData = await getTodoMessageDetail(newReplyId, form.value.id);
          const processedReply = processCommentData(newReplyData);
          const rootParentId = replyingCommentData.value.rootParentId || replyingCommentData.value.id;
          const parentComment = comments.value.find((c) => c.id === rootParentId);
          if (parentComment) {
            if (!parentComment.children)
              parentComment.children = [];
            processedReply.rootParentId = rootParentId;
            parentComment.children.push(processedReply);
          }
          resetReplyState();
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:417", "Lỗi gửi trả lời:", error);
        showError(t("common.error_send"));
      } finally {
        isSubmittingComment.value = false;
      }
    };
    const resetReplyState = () => {
      isReplying.value = false;
      replyingCommentData.value = null;
      replyingMessagePreview.value = "";
      replyingMemberName.value = "";
      newCommentText.value = "";
    };
    const onToggleEmojiPicker = (commentItem) => {
      currentReactingComment.value = commentItem;
      isEmojiPickerOpen.value = true;
    };
    const closeEmojiPicker = () => {
      isEmojiPickerOpen.value = false;
      currentReactingComment.value = null;
    };
    const selectEmoji = async (emoji) => {
      if (!currentReactingComment.value)
        return;
      const messageId = currentReactingComment.value.id;
      closeEmojiPicker();
      const todoId = form.value.id;
      const senderId = authStore.uid;
      const payload = {
        todoId: Number(todoId),
        senderId,
        todoMessageId: Number(messageId),
        codeEmoji: emoji
      };
      try {
        const res = await reactionTodoMessage(payload);
        if (res) {
          let foundComment = null;
          const parentIdx = comments.value.findIndex((c) => c.id === messageId);
          if (parentIdx !== -1) {
            foundComment = comments.value[parentIdx];
          } else {
            for (const parent of comments.value) {
              if (parent.children) {
                const child = parent.children.find((c) => c.id === messageId);
                if (child) {
                  foundComment = child;
                  break;
                }
              }
            }
          }
          if (foundComment) {
            if (!foundComment.reactions)
              foundComment.reactions = [];
            const existingReactionIndex = foundComment.reactions.findIndex(
              (r) => r.senderId === senderId
            );
            if (existingReactionIndex !== -1) {
              const currentEmoji = foundComment.reactions[existingReactionIndex].codeEmoji;
              if (currentEmoji === emoji) {
                formatAppLog("log", "at controllers/todo_detail.ts:495", "User thả trùng emoji cũ");
              } else {
                foundComment.reactions[existingReactionIndex].codeEmoji = emoji;
              }
            } else {
              foundComment.reactions.push({
                codeEmoji: emoji,
                senderId
              });
            }
            foundComment.reactions = [...foundComment.reactions];
          }
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:513", "Lỗi thả cảm xúc:", error);
        showError(t("common.error_connection"));
      }
    };
    const editingCommentData = vue.ref(null);
    const historyFilterIndex = vue.ref(0);
    const historyFilterOptions = vue.computed(() => [
      t("todo.history_all"),
      t("todo.history_todo"),
      t("todo.history_ticket"),
      t("todo.history_call"),
      t("todo.history_customer"),
      t("todo.history_note")
    ]);
    const historyFilterValues = [
      "ALL",
      "TODO",
      "TICKET",
      "HISTORY_CALL",
      "CUSTOMER",
      "NOTE"
    ];
    const form = vue.ref({
      id: "",
      title: "",
      code: t("common.loading"),
      desc: "",
      statusIndex: 0,
      sourceIndex: 0,
      assigneeIndex: 0,
      assigneeId: "",
      dueDate: "",
      notifyAt: "",
      customerCode: "",
      customerName: "",
      customerNameLabel: "",
      customerPhone: "",
      customerPhoneLabel: "",
      customerManagerName: "",
      customerManagerLabel: "",
      raw: void 0
    });
    const sourceOptions = vue.computed(() => [
      t("source.call"),
      t("source.customer"),
      t("source.conversation"),
      t("source.message")
    ]);
    const memberList = vue.ref([]);
    const assigneeOptions = vue.ref([]);
    const dynamicStatusOptions = vue.computed(() => {
      const options = [
        { label: t("todo.status_todo"), value: "TO_DO" },
        { label: t("todo.status_progress"), value: "IN_PROGRESS" },
        { label: t("todo.status_done"), value: "DONE" }
      ];
      if (form.value.raw && form.value.raw.status === "IN_PROGRESS") {
        return options.filter((opt) => opt.value !== "TO_DO");
      }
      return options;
    });
    const statusLabels = vue.computed(() => dynamicStatusOptions.value.map((opt) => opt.label));
    const onRequestEditComment = async (commentId) => {
      const todoId = form.value.id;
      if (!todoId)
        return;
      try {
        const res = await getTodoMessageDetail(commentId, todoId);
        formatAppLog("log", "at controllers/todo_detail.ts:581", "API Response Detail:", res);
        if (res) {
          const dataDetail = res.data || res;
          editingCommentData.value = {
            id: dataDetail.id,
            todoId: dataDetail.todoId,
            senderId: dataDetail.senderId
          };
          const senderId = dataDetail.senderId;
          const foundMember = memberList.value.find((m) => m.UID === senderId);
          if (foundMember) {
            editingMemberName.value = foundMember.UserName;
          } else {
            editingMemberName.value = t("common.me");
          }
          const content = dataDetail.message || "";
          formatAppLog("log", "at controllers/todo_detail.ts:607", "Nội dung edit:", content);
          isEditingComment.value = true;
          await vue.nextTick();
          newCommentText.value = content;
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:618", "Lỗi lấy chi tiết bình luận:", error);
        showError(t("common.error_load"));
      } finally {
        isLoading.value = false;
      }
    };
    const submitUpdateComment = async () => {
      if (!editingCommentData.value)
        return;
      if ((!newCommentText.value || !newCommentText.value.trim()) && !newCommentText.value.includes("<img")) {
        showInfo(t("todo.msg_empty_content"));
        return;
      }
      isSubmittingComment.value = true;
      try {
        const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);
        const payload = {
          id: editingCommentData.value.id,
          todoId: editingCommentData.value.todoId,
          senderId: editingCommentData.value.senderId,
          message: cleanMessage,
          files: fileUrl
        };
        const updatedData = await updateTodoMessage(payload);
        if (updatedData) {
          showSuccess(t("todo.msg_update_success"));
          const parentIndex = comments.value.findIndex((c) => c.id === updatedData.id);
          if (parentIndex !== -1) {
            comments.value[parentIndex].message = updatedData.message;
            comments.value[parentIndex].files = updatedData.files;
            comments.value[parentIndex].isEdited = true;
          } else {
            for (const parent of comments.value) {
              if (parent.children) {
                const childIndex = parent.children.findIndex((c) => c.id === updatedData.id);
                if (childIndex !== -1) {
                  parent.children[childIndex].message = updatedData.message;
                  parent.children[childIndex].files = updatedData.files;
                  parent.children[childIndex].isEdited = true;
                  break;
                }
              }
            }
          }
          resetEditState();
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:676", "Lỗi cập nhật:", error);
        showError(t("common.error_update"));
      } finally {
        isSubmittingComment.value = false;
      }
    };
    const onCancelEditComment = () => {
      isConfirmCancelEditOpen.value = true;
    };
    const continueEditing = () => {
      isConfirmCancelEditOpen.value = false;
    };
    const confirmCancelEdit = async () => {
      isConfirmCancelEditOpen.value = false;
      resetEditState();
      if (form.value.id) {
        await fetchComments(form.value.id);
      }
    };
    const resetEditState = () => {
      isEditingComment.value = false;
      editingCommentData.value = null;
      newCommentText.value = "";
      editingMemberName.value = "";
    };
    const onRequestDeleteComment = (commentId) => {
      commentToDeleteId.value = commentId;
      isConfirmDeleteCommentOpen.value = true;
    };
    const confirmDeleteComment = async () => {
      if (!commentToDeleteId.value)
        return;
      const idToDelete = commentToDeleteId.value;
      isConfirmDeleteCommentOpen.value = false;
      try {
        await deleteTodoMessage(idToDelete);
        showSuccess(t("todo.msg_deleted"));
        const parentIndex = comments.value.findIndex((c) => c.id === idToDelete);
        if (parentIndex !== -1) {
          comments.value.splice(parentIndex, 1);
        } else {
          for (const parent of comments.value) {
            if (parent.children && parent.children.length > 0) {
              const childIndex = parent.children.findIndex((c) => c.id === idToDelete);
              if (childIndex !== -1) {
                parent.children.splice(childIndex, 1);
                break;
              }
            }
          }
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:742", "Lỗi xóa bình luận:", error);
        showError(t("common.fail_delete"));
      } finally {
        commentToDeleteId.value = null;
      }
    };
    const cancelDeleteComment = () => {
      isConfirmDeleteCommentOpen.value = false;
      commentToDeleteId.value = null;
    };
    const submitComment = async () => {
      if ((!newCommentText.value || !newCommentText.value.trim()) && !newCommentText.value.includes("<img")) {
        showInfo("Vui lòng nhập nội dung");
        return;
      }
      isSubmittingComment.value = true;
      try {
        const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);
        const todoId = form.value.id;
        const senderId = authStore.uid;
        const payload = {
          todoId,
          senderId,
          message: cleanMessage,
          files: fileUrl,
          parentId: -1
        };
        const newCommentId = await createTodoMessage(payload);
        if (newCommentId) {
          showSuccess(t("todo.msg_comment_success"));
          newCommentText.value = "";
          const newCommentData = await getTodoMessageDetail(newCommentId, todoId);
          if (newCommentData) {
            const processedItem = processCommentData(newCommentData);
            comments.value.unshift(processedItem);
          }
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:792", "Lỗi gửi bình luận:", error);
        showError(t("common.error_send"));
      } finally {
        isSubmittingComment.value = false;
      }
    };
    onLoad((options) => {
      fetchMembers();
      if (options && options.id) {
        fetchDetail(options.id);
      }
    });
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        memberList.value = data;
        assigneeOptions.value = data.map((m) => m.UserName || t("common.unknown_member"));
        if (form.value.assigneeId) {
          const index = memberList.value.findIndex((m) => m.memberUID === form.value.assigneeId);
          if (index !== -1)
            form.value.assigneeIndex = index;
        }
      } catch (e) {
        formatAppLog("error", "at controllers/todo_detail.ts:817", "Lỗi lấy members", e);
      }
    };
    const reloadDetail = async () => {
      if (!form.value.id) {
        uni.stopPullDownRefresh();
        return;
      }
      try {
        await Promise.all([
          fetchDetail(form.value.id)
        ]);
      } catch (e) {
        formatAppLog("error", "at controllers/todo_detail.ts:831", e);
      } finally {
        uni.stopPullDownRefresh();
      }
    };
    onPullDownRefresh(() => {
      formatAppLog("log", "at controllers/todo_detail.ts:838", "Refreshing detail...");
      reloadDetail();
    });
    const fetchDetail = async (id) => {
      if (!form.value.title) {
        isLoading.value = true;
      } else {
        uni.showNavigationBarLoading();
      }
      try {
        const rawResponse = await getTodoDetail(id);
        const realData = rawResponse && rawResponse.data && !rawResponse.id ? rawResponse.data : rawResponse;
        const mappedData = mapTodoDetailToForm(realData);
        if (mappedData) {
          form.value = mappedData;
          const currentStatus = mappedData.raw.status;
          const realIndex = dynamicStatusOptions.value.findIndex((opt) => opt.value === currentStatus);
          if (realIndex !== -1) {
            form.value.statusIndex = realIndex;
          }
          if (form.value.assigneeId && memberList.value.length > 0) {
            const index = memberList.value.findIndex((m) => m.memberUID === form.value.assigneeId);
            if (index !== -1)
              form.value.assigneeIndex = index;
          }
          fetchComments(id);
          if (form.value.customerCode) {
            fetchCustomerInfo(form.value.customerCode);
            fetchHistoryLog(form.value.customerCode);
          }
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:878", "Lỗi lấy chi tiết:", error);
        showError(t("common.error_connection"));
      } finally {
        isLoading.value = false;
        uni.hideNavigationBarLoading();
      }
    };
    const processCommentData = (item) => {
      var _a;
      let senderName = t("todo.user_hidden");
      let avatarChar = "?";
      let avatarColor = "#e3f2fd";
      if (item.senderId) {
        const member = memberList.value.find((m) => m.UID === item.senderId || m.memberUID === item.senderId);
        if (member) {
          senderName = member.UserName;
          if (member.AvatarColor) {
            avatarColor = member.AvatarColor;
          }
        }
      }
      avatarChar = senderName.charAt(0).toUpperCase();
      let actionText = "";
      if (item.type === "COMMENT")
        actionText = t("todo.action_comment");
      else if (item.type === "LOG")
        actionText = t("todo.action_log");
      else if (item.type === "UPDATE_TODO")
        actionText = t("todo.action_update");
      const reactionList = ((_a = item.reactions) == null ? void 0 : _a.details) || [];
      return {
        id: item.id,
        senderId: item.senderId,
        senderName,
        senderAvatarChar: avatarChar,
        senderAvatarColor: avatarColor,
        message: item.message || "",
        files: item.files || "",
        timeDisplay: formatRelativeTime(item.createdAt),
        actionText,
        isEdited: !!item.updatedAt,
        type: item.type,
        reactions: reactionList,
        children: []
      };
    };
    const fetchComments = async (todoId) => {
      isLoadingComments.value = true;
      try {
        const currentKeySearch = commentFilterValues[commentFilterIndex.value];
        const rawData = await getTodoMessages(todoId, currentKeySearch);
        if (Array.isArray(rawData)) {
          comments.value = rawData.map((parent) => {
            const parentComment = processCommentData(parent);
            if (parent.replies && parent.replies.length > 0) {
              parentComment.children = parent.replies.map((child) => {
                const childComment = processCommentData(child);
                childComment.rootParentId = parent.id;
                return childComment;
              });
            }
            return parentComment;
          });
        } else {
          comments.value = [];
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:950", "Lỗi lấy bình luận:", error);
      } finally {
        isLoadingComments.value = false;
      }
    };
    const onCommentFilterChange = (e) => {
      const newIndex = e.detail.value;
      if (commentFilterIndex.value === newIndex)
        return;
      commentFilterIndex.value = newIndex;
      if (form.value.id) {
        fetchComments(form.value.id);
      }
    };
    const fetchCustomerInfo = async (customerUid) => {
      var _a;
      isLoadingCustomer.value = true;
      try {
        const crmToken = authStore.todoToken;
        if (!crmToken)
          return;
        const res = await getCrmCustomerDetail(crmToken, customerUid);
        const fields = res.fields || ((_a = res.data) == null ? void 0 : _a.fields) || [];
        const nameField = fields.find((f) => f.code === "name");
        const phoneField = fields.find((f) => f.code === "phone");
        const managerField = fields.find((f) => f.code === "member_no");
        if (nameField) {
          form.value.customerName = nameField.value;
          form.value.customerNameLabel = nameField.name || t("todo.customer_name_label");
        }
        if (phoneField) {
          form.value.customerPhone = phoneField.value;
          form.value.customerPhoneLabel = phoneField.name;
        }
        if (managerField) {
          form.value.customerManagerLabel = managerField.name || t("todo.customer_manager_label");
          const managerUid = managerField.value;
          const manager = memberList.value.find((m) => m.memberUID === managerUid);
          form.value.customerManagerName = manager ? manager.UserName : t("todo.unknown");
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:1008", "Lỗi CRM:", error);
      } finally {
        isLoadingCustomer.value = false;
      }
    };
    const fetchHistoryLog = async (customerUid) => {
      isLoadingHistory.value = true;
      try {
        const currentType = historyFilterValues[historyFilterIndex.value];
        const crmToken = authStore.todoToken;
        if (!crmToken) {
          formatAppLog("error", "at controllers/todo_detail.ts:1020", "Chưa có Token CRM/Todo");
          return;
        }
        const rawHistory = await getCrmActionTimeline(crmToken, customerUid, currentType);
        if (Array.isArray(rawHistory)) {
          historyList.value = rawHistory.map((item) => {
            const date = new Date(item.createAt);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            const timeStr = `${day}/${month}/${year}`;
            let actorName = t("common.system");
            if (item.memberUid) {
              const foundMember = memberList.value.find((m) => m.memberUID === item.memberUid);
              if (foundMember) {
                actorName = foundMember.UserName;
              }
            }
            const content = TIMELINE_TYPE_MAP[item.typeSub] || item.typeSub || t("todo.interaction_other");
            return {
              id: item.id,
              timeStr,
              content,
              actorName,
              originalType: item.typeSub
            };
          });
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:1058", "Lỗi lấy lịch sử:", error);
      } finally {
        isLoadingHistory.value = false;
      }
    };
    const onHistoryFilterChange = (e) => {
      historyFilterIndex.value = e.detail.value;
      if (form.value.customerCode) {
        fetchHistoryLog(form.value.customerCode);
      }
    };
    const onStatusChange = async (e) => {
      const newIndex = parseInt(e.detail.value);
      const selectedOption = dynamicStatusOptions.value[newIndex];
      if (!selectedOption)
        return;
      form.value.statusIndex = newIndex;
      const newStatus = selectedOption.value;
      if (!form.value.raw)
        return;
      isLoading.value = true;
      try {
        const payload = {
          ...form.value.raw,
          status: newStatus,
          preFixCode: "TODO",
          description: form.value.desc,
          files: "",
          tagCodes: "",
          title: form.value.title || form.value.raw.title
        };
        formatAppLog("log", "at controllers/todo_detail.ts:1105", "Payload Update Status:", payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess(t("todo.msg_status_changed"));
          form.value.raw.status = newStatus;
          const newDisplayIndex = dynamicStatusOptions.value.findIndex((opt) => opt.value === newStatus);
          form.value.statusIndex = newDisplayIndex !== -1 ? newDisplayIndex : 0;
          if (form.value.customerCode)
            await fetchHistoryLog(form.value.customerCode);
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:1121", "Lỗi cập nhật trạng thái:", error);
        showError(t("todo.msg_update_error"));
      } finally {
        isLoading.value = false;
      }
    };
    const onSourceChange = (e) => {
      form.value.sourceIndex = e.detail.value;
    };
    const onAssigneeChange = async (e) => {
      const idx = parseInt(e.detail.value);
      if (!memberList.value[idx])
        return;
      const selectedMember = memberList.value[idx];
      const newAssigneeId = selectedMember.memberUID;
      form.value.assigneeIndex = idx;
      form.value.assigneeId = newAssigneeId;
      if (!form.value.raw) {
        showError(t("common.error_missing_data"));
        return;
      }
      isLoading.value = true;
      try {
        const payload = {
          ...form.value.raw,
          assigneeId: newAssigneeId,
          preFixCode: "TODO",
          description: form.value.desc,
          files: "",
          tagCodes: "",
          title: form.value.title || form.value.raw.title
        };
        formatAppLog("log", "at controllers/todo_detail.ts:1165", "Payload Update Assignee:", payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess(t("todo.msg_assignee_changed"));
          form.value.raw.assigneeId = newAssigneeId;
          if (form.value.customerCode) {
            await fetchHistoryLog(form.value.customerCode);
          }
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:1183", "Lỗi cập nhật người giao:", error);
        showError(t("todo.msg_update_error"));
      } finally {
        isLoading.value = false;
      }
    };
    const goBack = () => {
      uni.navigateBack();
    };
    const saveTodo = () => {
      formatAppLog("log", "at controllers/todo_detail.ts:1192", "Lưu:", form.value);
      showSuccess(t("todo.msg_saved"));
    };
    return {
      isLoading,
      isLoadingCustomer,
      isLoadingHistory,
      historyList,
      form,
      statusOptions: statusLabels,
      sourceOptions,
      assigneeOptions,
      onStatusChange,
      onSourceChange,
      onAssigneeChange,
      goBack,
      saveTodo,
      historyFilterOptions,
      historyFilterIndex,
      onHistoryFilterChange,
      comments,
      isLoadingComments,
      newCommentText,
      isSubmittingComment,
      submitComment,
      isConfirmDeleteCommentOpen,
      onRequestDeleteComment,
      confirmDeleteComment,
      cancelDeleteComment,
      currentUserId,
      isEditingComment,
      onRequestEditComment,
      submitUpdateComment,
      onCancelEditComment,
      isConfirmCancelEditOpen,
      continueEditing,
      confirmCancelEdit,
      editingMemberName,
      isEmojiPickerOpen,
      emojiList,
      onToggleEmojiPicker,
      closeEmojiPicker,
      selectEmoji,
      isReplying,
      isConfirmCancelReplyOpen,
      replyingCommentData,
      replyingMemberName,
      onRequestReply,
      onCancelReply,
      confirmCancelReply,
      continueReplying,
      submitReply,
      commentFilterIndex,
      commentFilterOptions,
      onCommentFilterChange,
      isSavingDescription,
      onSaveDescription,
      onDateUpdate,
      isStatusDisabled,
      dynamicStatusOptions,
      onSaveTitle,
      replyingMessagePreview,
      isHistoryOpen,
      toggleHistory
    };
  };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "CommentItem",
    props: {
      data: { type: null, required: true },
      isReply: { type: Boolean, required: false }
    },
    emits: ["react", "reply", "edit", "delete"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const authStore = useAuthStore();
      const isMe = vue.computed(() => {
        return String(props.data.senderId) === String(authStore.uid);
      });
      const processedContent = vue.computed(() => {
        const rawHtml = props.data.message || "";
        return extractLinksAndCleanHtml(rawHtml);
      });
      const onPreviewImage = (url) => {
        if (!url)
          return;
        uni.previewImage({
          urls: [url],
          current: 0
        });
      };
      const __returned__ = { props, emit, authStore, isMe, processedContent, onPreviewImage, UserAvatar, LinkCard, CommentItem };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "comment-thread" }, [
      vue.createElementVNode("view", { class: "flex gap-3 mb-4 items-start" }, [
        vue.createVNode($setup["UserAvatar"], {
          name: $props.data.senderName,
          "avatar-color": $props.data.senderAvatarColor,
          size: $props.isReply ? 30 : 40,
          class: vue.normalizeClass(["shrink-0", $props.isReply ? "mr-2" : "mr-3"])
        }, null, 8, ["name", "avatar-color", "size", "class"]),
        vue.createElementVNode("view", { class: "flex-1 overflow-hidden" }, [
          vue.createElementVNode("view", { class: "bg-gray-50 rounded-2xl p-3 rounded-tl-none relative" }, [
            vue.createElementVNode("view", { class: "flex justify-between items-start mb-1" }, [
              vue.createElementVNode(
                "text",
                { class: "font-bold text-sm text-gray-900" },
                vue.toDisplayString($props.data.senderName),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "flex items-center" }, [
                vue.createElementVNode(
                  "text",
                  { class: "text-xs text-gray-400" },
                  vue.toDisplayString($props.data.timeDisplay),
                  1
                  /* TEXT */
                ),
                $props.data.isEdited ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "text-xs text-gray-400 italic ml-1"
                }, "• Đã sửa")) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("rich-text", {
              nodes: $setup.processedContent.cleanHtml,
              class: "text-sm text-gray-700 leading-normal"
            }, null, 8, ["nodes"]),
            $setup.processedContent.links.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "mt-2"
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.processedContent.links, (link, index) => {
                  return vue.openBlock(), vue.createBlock($setup["LinkCard"], {
                    key: index,
                    url: link
                  }, null, 8, ["url"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : vue.createCommentVNode("v-if", true),
            $props.data.files ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "mt-2"
            }, [
              vue.createElementVNode("image", {
                src: $props.data.files,
                mode: "widthFix",
                class: "comment-attachment-img",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => $setup.onPreviewImage($props.data.files), ["stop"]))
              }, null, 8, ["src"])
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { class: "c-footer-actions" }, [
            vue.createElementVNode("view", { class: "reaction-row" }, [
              $props.data.reactions && $props.data.reactions.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "flex gap-1 mt-1"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.data.reactions, (react, rIdx) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: rIdx,
                        class: "emoji-tag"
                      },
                      vue.toDisplayString(react.codeEmoji),
                      1
                      /* TEXT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            $props.data.type == "COMMENT" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "action-buttons-container"
            }, [
              vue.createElementVNode("view", {
                class: "btn-icon-action",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("react", $props.data))
              }, [
                vue.createElementVNode("image", {
                  src: "https://img.icons8.com/ios/50/999999/happy--v1.png",
                  class: "icon-action"
                })
              ]),
              vue.createElementVNode("view", {
                class: "btn-icon-action",
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("reply", $props.data))
              }, [
                vue.createElementVNode("image", {
                  src: "https://img.icons8.com/ios/50/999999/speech-bubble--v1.png",
                  class: "icon-action"
                })
              ]),
              $setup.isMe ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("view", {
                    class: "btn-icon-action",
                    onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("edit", $props.data))
                  }, [
                    vue.createElementVNode("image", {
                      src: "https://img.icons8.com/ios/50/999999/create-new.png",
                      class: "icon-action"
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "btn-icon-action",
                    onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("delete", $props.data.id))
                  }, [
                    vue.createElementVNode("image", {
                      src: "https://img.icons8.com/ios/50/999999/trash--v1.png",
                      class: "icon-action"
                    })
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      $props.data.children && $props.data.children.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "pl-12 mt-2 replies-wrapper"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.data.children, (child) => {
            return vue.openBlock(), vue.createBlock($setup["CommentItem"], {
              key: child.id,
              data: child,
              "is-reply": true,
              onReact: _cache[5] || (_cache[5] = (d) => _ctx.$emit("react", d)),
              onReply: _cache[6] || (_cache[6] = (d) => _ctx.$emit("reply", d)),
              onEdit: _cache[7] || (_cache[7] = (d) => _ctx.$emit("edit", d)),
              onDelete: _cache[8] || (_cache[8] = (id) => _ctx.$emit("delete", id))
            }, null, 8, ["data"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const CommentItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-8cb873be"], ["__file", "D:/uni_app/vbot-todo-android-2/components/Todo/CommentItem.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "todo_detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        isLoading,
        isLoadingCustomer,
        isLoadingHistory,
        historyList,
        form,
        statusOptions,
        sourceOptions,
        assigneeOptions,
        onStatusChange,
        onSourceChange,
        onAssigneeChange,
        saveTodo,
        historyFilterOptions,
        historyFilterIndex,
        onHistoryFilterChange,
        comments,
        isLoadingComments,
        newCommentText,
        isSubmittingComment,
        submitComment,
        isConfirmDeleteCommentOpen,
        onRequestDeleteComment,
        confirmDeleteComment,
        cancelDeleteComment,
        currentUserId,
        isEditingComment,
        onRequestEditComment,
        submitUpdateComment,
        onCancelEditComment,
        isConfirmCancelEditOpen,
        continueEditing,
        confirmCancelEdit,
        editingMemberName,
        isEmojiPickerOpen,
        emojiList,
        onToggleEmojiPicker,
        closeEmojiPicker,
        selectEmoji,
        isReplying,
        replyingMemberName,
        replyingCommentData,
        onRequestReply,
        onCancelReply,
        submitReply,
        isConfirmCancelReplyOpen,
        continueReplying,
        confirmCancelReply,
        commentFilterIndex,
        commentFilterOptions,
        onCommentFilterChange,
        isSavingDescription,
        onSaveDescription,
        onDateUpdate,
        isStatusDisabled,
        onSaveTitle,
        replyingMessagePreview,
        isHistoryOpen,
        toggleHistory
      } = useTodoDetailController();
      const isCommentsOpen = vue.ref(false);
      const scrollTarget = vue.ref("");
      const toggleComments = () => {
        isCommentsOpen.value = !isCommentsOpen.value;
      };
      const scrollToInput = () => {
        if (!isCommentsOpen.value) {
          isCommentsOpen.value = true;
        }
        scrollTarget.value = "";
        setTimeout(() => {
          scrollTarget.value = "comment-input-anchor";
        }, 100);
      };
      const handleReply = (data) => {
        onRequestReply(data);
        scrollToInput();
      };
      const handleEdit = (data) => {
        onRequestEditComment(data.id);
        scrollToInput();
      };
      const __returned__ = { isLoading, isLoadingCustomer, isLoadingHistory, historyList, form, statusOptions, sourceOptions, assigneeOptions, onStatusChange, onSourceChange, onAssigneeChange, saveTodo, historyFilterOptions, historyFilterIndex, onHistoryFilterChange, comments, isLoadingComments, newCommentText, isSubmittingComment, submitComment, isConfirmDeleteCommentOpen, onRequestDeleteComment, confirmDeleteComment, cancelDeleteComment, currentUserId, isEditingComment, onRequestEditComment, submitUpdateComment, onCancelEditComment, isConfirmCancelEditOpen, continueEditing, confirmCancelEdit, editingMemberName, isEmojiPickerOpen, emojiList, onToggleEmojiPicker, closeEmojiPicker, selectEmoji, isReplying, replyingMemberName, replyingCommentData, onRequestReply, onCancelReply, submitReply, isConfirmCancelReplyOpen, continueReplying, confirmCancelReply, commentFilterIndex, commentFilterOptions, onCommentFilterChange, isSavingDescription, onSaveDescription, onDateUpdate, isStatusDisabled, onSaveTitle, replyingMessagePreview, isHistoryOpen, toggleHistory, isCommentsOpen, scrollTarget, toggleComments, scrollToInput, handleReply, handleEdit, TodoEditor, TodoDatePicker, CommentItem, AppButton, GlobalMessage, ConfirmModal };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      $setup.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "loading-bar"
      })) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "detail-header" }, [
        vue.createElementVNode("view", { class: "header-top" }, [
          vue.createElementVNode(
            "text",
            { class: "header-code" },
            "#" + vue.toDisplayString($setup.form.code || "..."),
            1
            /* TEXT */
          )
        ]),
        vue.withDirectives(vue.createElementVNode("textarea", {
          class: "header-title-input",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.title = $event),
          placeholder: _ctx.$t("todo.header_loading"),
          "auto-height": "",
          maxlength: "256",
          "confirm-type": "done",
          onConfirm: _cache[1] || (_cache[1] = (...args) => $setup.onSaveTitle && $setup.onSaveTitle(...args)),
          onBlur: _cache[2] || (_cache[2] = (...args) => $setup.onSaveTitle && $setup.onSaveTitle(...args))
        }, null, 40, ["placeholder"]), [
          [vue.vModelText, $setup.form.title]
        ])
      ]),
      vue.createElementVNode("view", { class: "detail-body" }, [
        vue.createElementVNode(
          "view",
          { class: "section-title" },
          vue.toDisplayString(_ctx.$t("todo.desc_section")),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "section-block" }, [
          vue.createVNode($setup["TodoEditor"], {
            modelValue: $setup.form.desc,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.desc = $event),
            placeholder: _ctx.$t("todo.desc_placeholder")
          }, null, 8, ["modelValue", "placeholder"]),
          vue.createElementVNode("view", {
            class: "input-actions",
            style: { "margin-top": "10px" }
          }, [
            vue.createVNode($setup["AppButton"], {
              type: "primary",
              size: "small",
              loading: $setup.isSavingDescription,
              label: $setup.isSavingDescription ? _ctx.$t("common.saving") : _ctx.$t("common.save"),
              onClick: $setup.onSaveDescription
            }, null, 8, ["loading", "label", "onClick"])
          ])
        ]),
        vue.createElementVNode(
          "view",
          { class: "section-title" },
          vue.toDisplayString(_ctx.$t("todo.info_section")),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "info-group" }, [
          vue.createElementVNode("view", { class: "flat-item" }, [
            vue.createElementVNode("view", { class: "item-left" }, [
              vue.createElementVNode("image", {
                src: "https://img.icons8.com/ios/50/666666/checked-checkbox.png",
                class: "item-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "item-label" },
                vue.toDisplayString(_ctx.$t("todo.status")),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("picker", {
              mode: "selector",
              range: $setup.statusOptions,
              value: $setup.form.statusIndex,
              disabled: $setup.isStatusDisabled,
              onChange: _cache[4] || (_cache[4] = (...args) => $setup.onStatusChange && $setup.onStatusChange(...args)),
              class: "item-picker-box"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["picker-text", { "disabled-text": $setup.isStatusDisabled }])
                },
                [
                  vue.createTextVNode(
                    vue.toDisplayString($setup.statusOptions[$setup.form.statusIndex] || _ctx.$t("common.loading")) + " ",
                    1
                    /* TEXT */
                  ),
                  !$setup.isStatusDisabled ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "▾")) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )
            ], 40, ["range", "value", "disabled"])
          ]),
          vue.createElementVNode("view", { class: "flat-item" }, [
            vue.createElementVNode("view", { class: "item-left" }, [
              vue.createElementVNode("image", {
                src: "https://img.icons8.com/ios/50/666666/internet.png",
                class: "item-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "item-label" },
                vue.toDisplayString(_ctx.$t("todo.source")),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "item-picker-box" }, [
              vue.createElementVNode(
                "view",
                { class: "picker-text disabled-text" },
                vue.toDisplayString($setup.sourceOptions[$setup.form.sourceIndex] || "..."),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "flat-item" }, [
            vue.createElementVNode("view", { class: "item-left" }, [
              vue.createElementVNode("image", {
                src: "https://img.icons8.com/ios/50/666666/user.png",
                class: "item-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "item-label" },
                vue.toDisplayString(_ctx.$t("todo.assignee")),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("picker", {
              mode: "selector",
              range: $setup.assigneeOptions,
              value: $setup.form.assigneeIndex,
              onChange: _cache[5] || (_cache[5] = (...args) => $setup.onAssigneeChange && $setup.onAssigneeChange(...args)),
              class: "item-picker-box"
            }, [
              vue.createElementVNode(
                "view",
                { class: "picker-text" },
                vue.toDisplayString($setup.assigneeOptions.length > 0 && $setup.form.assigneeIndex > -1 ? $setup.assigneeOptions[$setup.form.assigneeIndex] : _ctx.$t("common.loading")) + " ▾ ",
                1
                /* TEXT */
              )
            ], 40, ["range", "value"])
          ]),
          vue.createVNode($setup["TodoDatePicker"], {
            dueDate: $setup.form.dueDate,
            "onUpdate:dueDate": _cache[6] || (_cache[6] = ($event) => $setup.form.dueDate = $event),
            notifyAt: $setup.form.notifyAt,
            "onUpdate:notifyAt": _cache[7] || (_cache[7] = ($event) => $setup.form.notifyAt = $event),
            onChange: $setup.onDateUpdate
          }, null, 8, ["dueDate", "notifyAt", "onChange"])
        ]),
        vue.createElementVNode(
          "view",
          { class: "section-title" },
          vue.toDisplayString(_ctx.$t("todo.customer_section")),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "info-group customer-block" }, [
          $setup.isLoadingCustomer ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-row"
          }, [
            vue.createElementVNode(
              "text",
              { class: "loading-text" },
              vue.toDisplayString(_ctx.$t("todo.loading_crm")),
              1
              /* TEXT */
            )
          ])) : !$setup.form.customerCode ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-row"
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(_ctx.$t("todo.no_customer_attached")),
              1
              /* TEXT */
            )
          ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
            vue.createElementVNode("view", { class: "flat-item" }, [
              vue.createElementVNode("view", { class: "item-left" }, [
                vue.createElementVNode("image", {
                  src: "https://img.icons8.com/ios/50/666666/user-male-circle.png",
                  class: "item-icon"
                }),
                vue.createElementVNode(
                  "text",
                  { class: "item-label" },
                  vue.toDisplayString($setup.form.customerNameLabel || _ctx.$t("todo.customer_name_label")),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                { class: "item-right-text" },
                vue.toDisplayString($setup.form.customerName),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "flat-item" }, [
              vue.createElementVNode("view", { class: "item-left" }, [
                vue.createElementVNode("image", {
                  src: "https://img.icons8.com/ios/50/666666/phone.png",
                  class: "item-icon"
                }),
                vue.createElementVNode(
                  "text",
                  { class: "item-label" },
                  vue.toDisplayString($setup.form.customerPhoneLabel || _ctx.$t("todo.customer_phone_label")),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                { class: "item-right-text phone-text" },
                vue.toDisplayString($setup.form.customerPhone),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "flat-item" }, [
              vue.createElementVNode("view", { class: "item-left" }, [
                vue.createElementVNode("image", {
                  src: "https://img.icons8.com/ios/50/666666/manager.png",
                  class: "item-icon"
                }),
                vue.createElementVNode(
                  "text",
                  { class: "item-label" },
                  vue.toDisplayString($setup.form.customerManagerLabel || _ctx.$t("todo.customer_manager_label")),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                { class: "item-right-text highlight-text" },
                vue.toDisplayString($setup.form.customerManagerName || _ctx.$t("todo.manager_none")),
                1
                /* TEXT */
              )
            ])
          ]))
        ]),
        vue.createElementVNode("view", { class: "section-header-row" }, [
          vue.createElementVNode("view", {
            class: "toggle-header",
            onClick: $setup.toggleComments
          }, [
            vue.createElementVNode(
              "text",
              { class: "section-title no-margin" },
              vue.toDisplayString(_ctx.$t("todo.comments_activities")),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "image",
              {
                src: "https://img.icons8.com/ios-glyphs/30/666666/expand-arrow--v1.png",
                class: vue.normalizeClass(["toggle-icon", { "open": $setup.isCommentsOpen }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("picker", {
            mode: "selector",
            range: $setup.commentFilterOptions,
            value: $setup.commentFilterIndex,
            onClick: _cache[8] || (_cache[8] = vue.withModifiers(() => {
            }, ["stop"])),
            onChange: _cache[9] || (_cache[9] = (...args) => $setup.onCommentFilterChange && $setup.onCommentFilterChange(...args))
          }, [
            vue.createElementVNode(
              "view",
              { class: "filter-badge" },
              vue.toDisplayString($setup.commentFilterOptions[$setup.commentFilterIndex]) + " ▾",
              1
              /* TEXT */
            )
          ], 40, ["range", "value"])
        ]),
        $setup.isCommentsOpen ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "comments-section"
        }, [
          vue.createElementVNode("view", {
            class: "comment-input-block",
            id: "comment-input-anchor"
          }, [
            vue.createElementVNode("view", { class: "editor-container" }, [
              vue.createVNode($setup["TodoEditor"], {
                modelValue: $setup.newCommentText,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.newCommentText = $event),
                placeholder: $setup.isEditingComment ? _ctx.$t("todo.comment_placeholder_edit") : $setup.isReplying ? _ctx.$t("todo.comment_placeholder_reply") : _ctx.$t("todo.comment_placeholder_write")
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            $setup.isEditingComment ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "editing-alert"
            }, [
              vue.createElementVNode("text", { class: "editing-text" }, [
                vue.createTextVNode(
                  vue.toDisplayString(_ctx.$t("todo.editing_alert")) + " ",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "editing-name" },
                  vue.toDisplayString($setup.editingMemberName),
                  1
                  /* TEXT */
                )
              ])
            ])) : vue.createCommentVNode("v-if", true),
            $setup.isReplying && $setup.replyingCommentData ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "reply-alert"
            }, [
              vue.createElementVNode("view", { class: "reply-info" }, [
                vue.createElementVNode(
                  "text",
                  { class: "reply-label" },
                  vue.toDisplayString(_ctx.$t("todo.replying_alert")),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "reply-name" },
                  vue.toDisplayString($setup.replyingMemberName),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "reply-quote" }, [
                vue.createElementVNode("text", { class: "quote-icon" }, "“"),
                vue.createElementVNode("rich-text", {
                  nodes: $setup.replyingMessagePreview,
                  class: "quote-content"
                }, null, 8, ["nodes"]),
                vue.createElementVNode("text", { class: "quote-icon" }, "”")
              ])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "input-actions" }, [
              !$setup.isEditingComment && !$setup.isReplying ? (vue.openBlock(), vue.createBlock($setup["AppButton"], {
                key: 0,
                type: "primary",
                size: "small",
                loading: $setup.isSubmittingComment,
                label: $setup.isSubmittingComment ? _ctx.$t("common.saving") : _ctx.$t("common.save"),
                onClick: $setup.submitComment
              }, null, 8, ["loading", "label", "onClick"])) : $setup.isEditingComment ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "edit-actions-row"
              }, [
                vue.createVNode($setup["AppButton"], {
                  type: "secondary",
                  size: "small",
                  label: _ctx.$t("common.cancel"),
                  disabled: $setup.isSubmittingComment,
                  onClick: $setup.onCancelEditComment
                }, null, 8, ["label", "disabled", "onClick"]),
                vue.createVNode($setup["AppButton"], {
                  type: "primary",
                  size: "small",
                  loading: $setup.isSubmittingComment,
                  label: $setup.isSubmittingComment ? _ctx.$t("common.saving") : _ctx.$t("todo.update_btn"),
                  onClick: $setup.submitUpdateComment
                }, null, 8, ["loading", "label", "onClick"])
              ])) : $setup.isReplying ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "edit-actions-row"
              }, [
                vue.createVNode($setup["AppButton"], {
                  type: "secondary",
                  size: "small",
                  label: _ctx.$t("common.cancel"),
                  disabled: $setup.isSubmittingComment,
                  onClick: $setup.onCancelReply
                }, null, 8, ["label", "disabled", "onClick"]),
                vue.createVNode($setup["AppButton"], {
                  type: "primary",
                  size: "small",
                  loading: $setup.isSubmittingComment,
                  label: $setup.isSubmittingComment ? _ctx.$t("common.saving") : _ctx.$t("todo.reply_btn"),
                  onClick: $setup.submitReply
                }, null, 8, ["loading", "label", "onClick"])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createElementVNode("view", { class: "divider-line" }),
          $setup.isLoadingComments ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-row"
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(_ctx.$t("todo.loading_comments")),
              1
              /* TEXT */
            )
          ])) : $setup.comments.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-row"
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(_ctx.$t("todo.no_comments")),
              1
              /* TEXT */
            )
          ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.comments, (item) => {
                return vue.openBlock(), vue.createBlock($setup["CommentItem"], {
                  key: item.id,
                  data: item,
                  onReact: $setup.onToggleEmojiPicker,
                  onReply: _cache[11] || (_cache[11] = (data) => $setup.handleReply(data)),
                  onEdit: _cache[12] || (_cache[12] = (data) => $setup.handleEdit(data)),
                  onDelete: _cache[13] || (_cache[13] = (id) => $setup.onRequestDeleteComment(id))
                }, null, 8, ["data", "onReact"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]))
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "section-header-row" }, [
          vue.createElementVNode("view", {
            class: "toggle-header",
            onClick: _cache[14] || (_cache[14] = (...args) => $setup.toggleHistory && $setup.toggleHistory(...args))
          }, [
            vue.createElementVNode(
              "text",
              { class: "section-title no-margin" },
              vue.toDisplayString(_ctx.$t("todo.history_section")),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "image",
              {
                src: "https://img.icons8.com/ios-glyphs/30/666666/expand-arrow--v1.png",
                class: vue.normalizeClass(["toggle-icon", { "open": $setup.isHistoryOpen }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("picker", {
            mode: "selector",
            range: $setup.historyFilterOptions,
            value: $setup.historyFilterIndex,
            onClick: _cache[15] || (_cache[15] = vue.withModifiers(() => {
            }, ["stop"])),
            onChange: _cache[16] || (_cache[16] = (...args) => $setup.onHistoryFilterChange && $setup.onHistoryFilterChange(...args))
          }, [
            vue.createElementVNode(
              "view",
              { class: "filter-badge" },
              vue.toDisplayString($setup.historyFilterOptions[$setup.historyFilterIndex]) + " ▾",
              1
              /* TEXT */
            )
          ], 40, ["range", "value"])
        ]),
        $setup.isHistoryOpen ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "history-container"
        }, [
          $setup.isLoadingHistory ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-row"
          }, [
            vue.createElementVNode(
              "text",
              { class: "loading-text" },
              vue.toDisplayString(_ctx.$t("todo.loading_history")),
              1
              /* TEXT */
            )
          ])) : $setup.historyList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-row"
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(_ctx.$t("todo.no_history")),
              1
              /* TEXT */
            )
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "timeline-list"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.historyList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.id,
                  class: "timeline-item"
                }, [
                  index !== $setup.historyList.length - 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "timeline-line"
                  })) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "timeline-dot" }),
                  vue.createElementVNode("view", { class: "timeline-content" }, [
                    vue.createElementVNode("view", { class: "timeline-header" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "t-actor" },
                        vue.toDisplayString(item.actorName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "t-time" },
                        vue.toDisplayString(item.timeStr),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode(
                      "text",
                      { class: "t-action" },
                      vue.toDisplayString(item.content),
                      1
                      /* TEXT */
                    )
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]))
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { style: { "height": "50px" } })
      ]),
      vue.createVNode($setup["ConfirmModal"], {
        visible: $setup.isConfirmCancelEditOpen,
        "onUpdate:visible": _cache[17] || (_cache[17] = ($event) => $setup.isConfirmCancelEditOpen = $event),
        title: _ctx.$t("todo.cancel_edit_title"),
        message: _ctx.$t("todo.cancel_edit_msg"),
        "cancel-label": _ctx.$t("todo.continue_edit"),
        "confirm-label": _ctx.$t("common.cancel_action"),
        "confirm-type": "danger",
        onCancel: $setup.continueEditing,
        onConfirm: $setup.confirmCancelEdit
      }, null, 8, ["visible", "title", "message", "cancel-label", "confirm-label", "onCancel", "onConfirm"]),
      vue.createVNode($setup["ConfirmModal"], {
        visible: $setup.isConfirmCancelReplyOpen,
        "onUpdate:visible": _cache[18] || (_cache[18] = ($event) => $setup.isConfirmCancelReplyOpen = $event),
        title: _ctx.$t("todo.cancel_reply_title"),
        message: _ctx.$t("todo.cancel_reply_msg"),
        "cancel-label": _ctx.$t("todo.continue_reply"),
        "confirm-label": _ctx.$t("common.cancel_action"),
        "confirm-type": "danger",
        onCancel: $setup.continueReplying,
        onConfirm: $setup.confirmCancelReply
      }, null, 8, ["visible", "title", "message", "cancel-label", "confirm-label", "onCancel", "onConfirm"]),
      vue.createVNode($setup["ConfirmModal"], {
        visible: $setup.isConfirmDeleteCommentOpen,
        "onUpdate:visible": _cache[19] || (_cache[19] = ($event) => $setup.isConfirmDeleteCommentOpen = $event),
        title: _ctx.$t("todo.delete_comment_title"),
        message: _ctx.$t("todo.delete_comment_msg"),
        "confirm-type": "danger",
        onConfirm: $setup.confirmDeleteComment,
        onCancel: $setup.cancelDeleteComment
      }, null, 8, ["visible", "title", "message", "onConfirm", "onCancel"]),
      $setup.isEmojiPickerOpen ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: _cache[21] || (_cache[21] = (...args) => $setup.closeEmojiPicker && $setup.closeEmojiPicker(...args))
      }, [
        vue.createElementVNode("view", {
          class: "emoji-picker-container",
          onClick: _cache[20] || (_cache[20] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "emoji-grid" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.emojiList, (emoji, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "emoji-item",
                  onClick: ($event) => $setup.selectEmoji(emoji)
                }, vue.toDisplayString(emoji), 9, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode($setup["GlobalMessage"])
    ]);
  }
  const PagesTodoTodoDetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-9f96c8fe"], ["__file", "D:/uni_app/vbot-todo-android-2/pages/todo/todo_detail.vue"]]);
  __definePage("pages/todo/list_todo", PagesTodoListTodo);
  __definePage("pages/todo/create_todo", PagesTodoCreateTodo);
  __definePage("pages/todo/todo_detail", PagesTodoTodoDetail);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      onLaunch((options) => {
        formatAppLog("log", "at App.vue:6", "App Launch");
        const authStore = useAuthStore();
        authStore.initialize(options);
      });
      onShow(() => {
        formatAppLog("log", "at App.vue:13", "App Show");
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:17", "App Hide");
      });
      const __returned__ = { get useAuthStore() {
        return useAuthStore;
      }, get onLaunch() {
        return onLaunch;
      }, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/uni_app/vbot-todo-android-2/App.vue"]]);
  const common$1 = {
    loading: "Đang tải dữ liệu...",
    no_data: "Chưa có dữ liệu",
    all: "Tất cả",
    reset: "Đặt lại",
    apply: "Áp dụng",
    "delete": "Xóa",
    confirm: "Xác nhận",
    cancel: "Hủy",
    notification: "Thông báo",
    success_delete: "Đã xóa thành công",
    fail_delete: "Xóa thất bại",
    error_load: "Lỗi tải dữ liệu",
    save: "Lưu",
    saving: "Đang lưu...",
    cancel_action: "Hủy bỏ",
    search: "Tìm kiếm",
    filter: "Lọc",
    me: "tôi",
    system: "Hệ thống",
    unknown_member: "Thành viên ẩn danh",
    error_missing_data: "Thiếu dữ liệu gốc",
    error_connection: "Lỗi kết nối",
    error_update: "Cập nhật thất bại",
    error_send: "Gửi thất bại",
    page_unit: "trang",
    total: "Tổng",
    from_date: "Từ ngày",
    to_date: "Đến ngày",
    hidden_member: "Thành viên ẩn",
    hidden_user: "Người dùng ẩn"
  };
  const todo$1 = {
    page_title: "Công việc",
    create_page_title: "Tạo công việc",
    add_task: "Thêm công việc",
    created_at: "Tạo",
    expired_at: "Hết hạn",
    notify_at: "Thông báo",
    code_prefix: "Mã công việc",
    filter_title: "Bộ lọc tìm kiếm",
    search_placeholder: "Nhập từ khóa...",
    search_label: "Tiêu đề / Từ khóa",
    job_code_placeholder: "Ví dụ: TODO-08",
    status: "Trạng thái",
    creator: "Người tạo",
    customer: "Khách hàng",
    select_customer: "Chọn khách hàng",
    assignee: "Người được giao",
    source: "Nguồn",
    select_source: "Chọn nguồn",
    time_create: "Thời gian tạo",
    time_expired: "Thời gian hết hạn",
    time_notify: "Thời gian thông báo",
    confirm_delete_msg: 'Bạn có chắc muốn xóa công việc "{title}"?',
    enter_task_name: "Nhập tên công việc... *",
    char_count: "{current}/{max}",
    due_date_label: "Hạn xử lý:",
    notify_date_label: "Ngày thông báo:",
    select_date: "Chọn ngày",
    date_text: "Ngày",
    time_text: "Giờ",
    validate_name: "Vui lòng nhập tên công việc",
    create_success: "Tạo thành công!",
    upload_processing: "Đang xử lý dữ liệu...",
    header_loading: "Đang tải tên công việc...",
    desc_section: "Mô tả",
    desc_placeholder: "Nhập mô tả công việc...",
    info_section: "Thông tin công việc",
    customer_section: "Thông tin khách hàng",
    loading_crm: "⏳ Đang tải thông tin từ CRM...",
    no_customer_attached: "(Công việc này chưa gắn với khách hàng nào)",
    customer_name_label: "Khách hàng",
    customer_phone_label: "SĐT",
    customer_manager_label: "Phụ trách",
    manager_none: "(Chưa có)",
    comments_activities: "Bình luận và hoạt động",
    comment_placeholder_edit: "Đang chỉnh sửa...",
    comment_placeholder_reply: "Viết câu trả lời...",
    comment_placeholder_write: "Viết bình luận",
    editing_alert: "Đang chỉnh sửa bình luận của",
    replying_alert: "Đang trả lời bình luận của",
    loading_comments: "⏳ Đang tải bình luận...",
    no_comments: "Chưa có bình luận nào.",
    history_section: "Lịch sử tương tác khách hàng",
    loading_history: "⏳ Đang tải lịch sử...",
    no_history: "(Không tìm thấy dữ liệu)",
    reply_btn: "Trả lời",
    update_btn: "Cập nhật",
    cancel_edit_title: "Xác nhận hủy",
    cancel_edit_msg: "Bạn có chắc muốn hủy chỉnh sửa? Các thay đổi sẽ không được lưu.",
    continue_edit: "Tiếp tục sửa",
    cancel_reply_title: "Hủy trả lời",
    cancel_reply_msg: "Bạn có chắc muốn hủy trả lời? Nội dung đã nhập sẽ bị mất.",
    continue_reply: "Tiếp tục viết",
    delete_comment_title: "Xác nhận xóa",
    delete_comment_msg: "Bạn có chắc muốn xóa bình luận này không?",
    status_todo: "Chưa xử lý",
    status_progress: "Đang xử lý",
    status_done: "Hoàn thành",
    status_overdue: "Quá hạn",
    filter_activity_all: "Tất cả hoạt động",
    filter_activity_comment: "Bình luận",
    history_all: "Tất cả",
    history_todo: "Công việc",
    history_ticket: "Ticket",
    history_call: "Lịch sử gọi",
    history_customer: "Khách hàng",
    history_note: "Ghi chú",
    msg_update_success: "Cập nhật thành công",
    msg_update_error: "Lỗi cập nhật",
    msg_title_empty: "Tiêu đề không được để trống",
    msg_title_changed: "Đã đổi tiêu đề",
    msg_desc_saved: "Đã cập nhật mô tả",
    msg_reply_success: "Đã trả lời",
    msg_comment_success: "Đã gửi bình luận",
    msg_empty_content: "Vui lòng nhập nội dung",
    msg_assignee_changed: "Đã đổi người thực hiện",
    msg_status_changed: "Đã cập nhật trạng thái",
    action_comment: "đã thêm một bình luận",
    action_log: "đã cập nhật hoạt động",
    action_update: "cập nhật thông tin công việc",
    user_hidden: "Người dùng ẩn",
    unknown: "Chưa xác định",
    msg_deleted: "Đã xóa",
    msg_saved: "Đã lưu",
    interaction_other: "Tương tác khác"
  };
  const customer_modal$1 = {
    title: "Chọn khách hàng",
    placeholder_name: "Nhập tên khách hàng",
    placeholder_phone: "Nhập số điện thoại",
    manager_default: "Thành viên quản lý",
    loading_more: "Đang tải thêm...",
    no_name: "(Không tên)",
    no_phone: "Không có SĐT"
  };
  const editor$1 = {
    placeholder: "Nhập nội dung mô tả...",
    link_modal_title: "Chèn Hyperlink (Text)",
    card_modal_title: "Chèn Thẻ Liên Kết (Web)",
    card_modal_desc: "Liên kết sẽ hiển thị dạng thẻ xem trước.",
    color_text: "Màu chữ",
    color_bg: "Màu nền",
    align_left: "Căn trái",
    align_center: "Căn giữa",
    align_right: "Căn phải",
    align_justify: "Căn đều",
    size_small: "Nhỏ",
    size_normal: "Bình thường",
    size_large: "Lớn",
    size_huge: "Rất lớn",
    img_camera: "Chụp ảnh mới",
    img_album: "Chọn từ thư viện"
  };
  const source$1 = {
    call: "Cuộc gọi",
    customer: "Khách hàng",
    conversation: "Hội thoại",
    message: "Tin nhắn"
  };
  const uni$2 = {
    showActionSheet: {
      cancel: "Hủy"
    }
  };
  const vi = {
    common: common$1,
    todo: todo$1,
    customer_modal: customer_modal$1,
    editor: editor$1,
    source: source$1,
    uni: uni$2,
    "uni-datetime-picker": {
      selectDate: "Chọn ngày",
      selectTime: "Chọn giờ",
      selectDateTime: "Chọn ngày giờ",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
      ok: "OK",
      clear: "Xóa",
      cancel: "Hủy",
      year: "Năm",
      month: "Tháng"
    },
    "uni-calender": {
      confirm: "Xác nhận",
      SUN: "CN",
      MON: "T2",
      TUE: "T3",
      WED: "T4",
      THU: "T5",
      FRI: "T6",
      SAT: "T7",
      jan: "Tháng 1",
      feb: "Tháng 2",
      mar: "Tháng 3",
      apr: "Tháng 4",
      may: "Tháng 5",
      jun: "Tháng 6",
      jul: "Tháng 7",
      aug: "Tháng 8",
      sep: "Tháng 9",
      oct: "Tháng 10",
      nov: "Tháng 11",
      dec: "Tháng 12"
    }
  };
  const common = {
    loading: "Loading data...",
    no_data: "No data available",
    all: "All",
    reset: "Reset",
    apply: "Apply",
    "delete": "Delete",
    confirm: "Confirm",
    cancel: "Cancel",
    notification: "Notification",
    success_delete: "Deleted successfully",
    fail_delete: "Delete failed",
    error_load: "Error loading data",
    save: "Save",
    saving: "Saving...",
    cancel_action: "Cancel",
    search: "Search",
    filter: "Filter",
    me: "me",
    system: "System",
    unknown_member: "Unknown Member",
    error_missing_data: "Original data missing",
    error_connection: "Connection error",
    error_update: "Update failed",
    error_send: "Send failed",
    page_unit: "page",
    total: "Total",
    from_date: "From Date",
    to_date: "To Date",
    hidden_member: "Hidden Member",
    hidden_user: "Hidden User"
  };
  const todo = {
    page_title: "Todo",
    create_page_title: "Create Task",
    add_task: "Add Task",
    created_at: "Created",
    expired_at: "Due date",
    notify_at: "Notify",
    code_prefix: "Job Code",
    filter_title: "Search Filter",
    search_placeholder: "Enter keywords...",
    search_label: "Title / Keywords",
    job_code_placeholder: "Ex: TODO-08",
    status: "Status",
    creator: "Creator",
    customer: "Customer",
    select_customer: "Select Customer",
    assignee: "Assignee",
    source: "Source",
    select_source: "Select Source",
    time_create: "Created Time",
    time_expired: "Due Date Time",
    time_notify: "Notification Time",
    confirm_delete_msg: 'Are you sure you want to delete "{title}"?',
    enter_task_name: "Enter task name... *",
    char_count: "{current}/{max}",
    due_date_label: "Due Date:",
    notify_date_label: "Notify Date:",
    select_date: "Select Date",
    date_text: "Date",
    time_text: "Time",
    validate_name: "Please enter task name",
    create_success: "Created successfully!",
    upload_processing: "Processing data...",
    header_loading: "Loading task title...",
    desc_section: "Description",
    desc_placeholder: "Enter task description...",
    info_section: "Task Information",
    customer_section: "Customer Information",
    loading_crm: "⏳ Loading CRM info...",
    no_customer_attached: "(No customer attached)",
    customer_name_label: "Customer",
    customer_phone_label: "Phone",
    customer_manager_label: "In charge",
    manager_none: "(None)",
    comments_activities: "Comments & Activities",
    comment_placeholder_edit: "Editing...",
    comment_placeholder_reply: "Write a reply...",
    comment_placeholder_write: "Write a comment",
    editing_alert: "Editing comment of",
    replying_alert: "Replying to comment of",
    loading_comments: "⏳ Loading comments...",
    no_comments: "No comments yet.",
    history_section: "Customer Interaction History",
    loading_history: "⏳ Loading history...",
    no_history: "(No data found)",
    reply_btn: "Reply",
    update_btn: "Update",
    cancel_edit_title: "Cancel Editing",
    cancel_edit_msg: "Are you sure you want to cancel? Changes will be lost.",
    continue_edit: "Keep Editing",
    cancel_reply_title: "Cancel Reply",
    cancel_reply_msg: "Are you sure? Draft content will be lost.",
    continue_reply: "Keep Writing",
    delete_comment_title: "Confirm Delete",
    delete_comment_msg: "Are you sure you want to delete this comment?",
    status_todo: "To Do",
    status_progress: "In Progress",
    status_done: "Done",
    status_overdue: "Overdue",
    filter_activity_all: "All Activities",
    filter_activity_comment: "Comments",
    history_all: "All",
    history_todo: "Tasks",
    history_ticket: "Tickets",
    history_call: "Calls",
    history_customer: "Customer",
    history_note: "Notes",
    msg_update_success: "Update successful",
    msg_update_error: "Update failed",
    msg_title_empty: "Title cannot be empty",
    msg_title_changed: "Title changed",
    msg_desc_saved: "Description updated",
    msg_reply_success: "Replied successfully",
    msg_comment_success: "Comment sent",
    msg_empty_content: "Please enter content",
    msg_assignee_changed: "Assignee changed",
    msg_status_changed: "Status updated",
    action_comment: "added a comment",
    action_log: "updated activity",
    action_update: "updated task info",
    user_hidden: "Hidden User",
    unknown: "Unknown",
    msg_deleted: "Deleted",
    msg_saved: "Saved",
    interaction_other: "Other interaction"
  };
  const customer_modal = {
    title: "Select Customer",
    placeholder_name: "Enter customer name",
    placeholder_phone: "Enter phone number",
    manager_default: "Manager Member",
    loading_more: "Loading more...",
    no_name: "(No Name)",
    no_phone: "No Phone"
  };
  const editor = {
    placeholder: "Enter description...",
    link_modal_title: "Insert Hyperlink (Text)",
    card_modal_title: "Insert Link Card (Web)",
    card_modal_desc: "Link will be displayed as a preview card.",
    color_text: "Text Color",
    color_bg: "Background Color",
    align_left: "Align Left",
    align_center: "Align Center",
    align_right: "Align Right",
    align_justify: "Justify",
    size_small: "Small",
    size_normal: "Normal",
    size_large: "Large",
    size_huge: "Huge",
    img_camera: "Take Photo",
    img_album: "Choose from Album"
  };
  const source = {
    call: "Call",
    customer: "Customer",
    conversation: "Conversation",
    message: "Message"
  };
  const uni$1 = {
    showActionSheet: {
      cancel: "Cancel"
    }
  };
  const en = {
    common,
    todo,
    customer_modal,
    editor,
    source,
    uni: uni$1,
    "uni-datetime-picker": {
      selectDate: "Select Date",
      selectTime: "Select Time",
      selectDateTime: "Select Date & Time",
      startDate: "Start Date",
      endDate: "End Date",
      ok: "OK",
      clear: "Clear",
      cancel: "Cancel",
      year: "Year",
      month: "Month"
    },
    "uni-calender": {
      confirm: "Confirm",
      SUN: "Sun",
      MON: "Mon",
      TUE: "Tue",
      WED: "Wed",
      THU: "Thu",
      FRI: "Fri",
      SAT: "Sat",
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dec"
    }
  };
  const curLocale = "vi";
  const i18n = createI18n({
    locale: curLocale,
    fallbackLocale: "vi",
    messages: {
      vi,
      en
    },
    legacy: false,
    globalInjection: true
  });
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    app.use(i18n);
    const currentLocale = i18n.global.locale.value || i18n.global.locale;
    uni.setLocale(currentLocale);
    return {
      app,
      Pinia
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
