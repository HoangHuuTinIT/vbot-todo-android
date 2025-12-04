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
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
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
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$e = {
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
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
  const UserAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-7abf19e0"], ["__file", "D:/uni_app/vbot-todo-android/components/UserAvatar.vue"]]);
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
    const d = new Date(dateStr);
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
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "DateRangeFilter",
    props: {
      title: { type: String, required: false },
      startDate: { type: String, required: true },
      endDate: { type: String, required: true }
    },
    emits: ["update:startDate", "update:endDate"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const onStartChange = (e) => {
        emit("update:startDate", e.detail.value);
      };
      const onEndChange = (e) => {
        emit("update:endDate", e.detail.value);
      };
      const __returned__ = { props, emit, onStartChange, onEndChange, get formatDateDisplay() {
        return formatDateDisplay;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
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
          vue.createElementVNode("picker", {
            mode: "date",
            value: $props.startDate,
            onChange: $setup.onStartChange
          }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["f-picker date", { "placeholder": !$props.startDate }])
              },
              vue.toDisplayString($props.startDate ? $setup.formatDateDisplay($props.startDate) : "Từ ngày"),
              3
              /* TEXT, CLASS */
            )
          ], 40, ["value"])
        ]),
        vue.createElementVNode("view", { class: "f-group half" }, [
          vue.createElementVNode("picker", {
            mode: "date",
            value: $props.endDate,
            onChange: $setup.onEndChange
          }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["f-picker date", { "placeholder": !$props.endDate }])
              },
              vue.toDisplayString($props.endDate ? $setup.formatDateDisplay($props.endDate) : "Đến ngày"),
              3
              /* TEXT, CLASS */
            )
          ], 40, ["value"])
        ])
      ])
    ]);
  }
  const DateRangeFilter = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-645c14d9"], ["__file", "D:/uni_app/vbot-todo-android/components/DateRangeFilter.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
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
        formatAppLog("log", "at components/Todo/CustomerModal.vue:109", "Cuộn xuống đáy -> Load more");
        emit("loadMore");
      };
      const managerDisplayOptions = vue.computed(() => {
        const defaultOption = "Thành viên quản lý";
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
        formatAppLog("log", "at components/Todo/CustomerModal.vue:146", "Đã đặt lại bộ lọc");
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
      const __returned__ = { props, emit, isFilterExpanded, filter, onScrollToLower, managerDisplayOptions, toggleFilter, onManagerChange, resetFilter, applyFilter, close, selectCustomer, formatDate, UserAvatar, DateRangeFilter };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
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
          vue.createElementVNode("text", { class: "modal-title" }, "Chọn khách hàng"),
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
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "f-input",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.filter.name = $event),
                placeholder: "Nhập tên khách hàng",
                "placeholder-class": "ph-style"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.filter.name]
            ])
          ]),
          vue.createElementVNode("view", { class: "f-item" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "f-input",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.filter.phone = $event),
                type: "number",
                placeholder: "Nhập số điện thoại",
                "placeholder-class": "ph-style"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
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
            vue.createElementVNode("button", {
              class: "btn-reset",
              onClick: $setup.resetFilter
            }, "Đặt lại"),
            vue.createElementVNode("button", {
              class: "btn-submit",
              onClick: $setup.applyFilter
            }, "Lọc")
          ])
        ])) : vue.createCommentVNode("v-if", true),
        $props.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "loading-state"
        }, "Đang tải dữ liệu...")) : (vue.openBlock(), vue.createElementBlock(
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
                      vue.toDisplayString(item.name || "(Không tên)"),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "phone-text" },
                      vue.toDisplayString(item.phone || "Không có SĐT"),
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
              vue.createElementVNode("text", { class: "loading-more-text" }, "Đang tải thêm...")
            ])) : vue.createCommentVNode("v-if", true),
            $props.customers.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "empty-state"
            }, "Không có dữ liệu")) : vue.createCommentVNode("v-if", true)
          ],
          32
          /* NEED_HYDRATION */
        ))
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const CustomerModal = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-0c007ba7"], ["__file", "D:/uni_app/vbot-todo-android/components/Todo/CustomerModal.vue"]]);
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
          const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache[id] = store;
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
    DONE: "DONE"
  };
  const STATUS_LABELS = {
    "TO_DO": "Chưa xử lý",
    "IN_PROGRESS": "Đang xử lý",
    "DONE": "Hoàn thành"
  };
  const STATUS_COLORS = {
    "TO_DO": "bg-gray",
    "IN_PROGRESS": "bg-orange",
    "DONE": "bg-green"
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
    return {
      keySearch: filter.title || "",
      code: filter.jobCode || "",
      status: statusValue || "",
      startDate: getStartOfDay(filter.createdFrom),
      endDate: getStartOfNextDay(filter.createdTo),
      dueDateFrom: getStartOfDay(filter.dueDateFrom),
      dueDateTo: getStartOfNextDay(filter.dueDateTo),
      notificationReceivedAtFrom: getStartOfDay(filter.notifyFrom),
      notificationReceivedAtTo: getStartOfNextDay(filter.notifyTo),
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
    const statusOptions = ["Tất cả", STATUS_LABELS[TODO_STATUS.NEW], STATUS_LABELS[TODO_STATUS.IN_PROGRESS], STATUS_LABELS[TODO_STATUS.DONE]];
    const statusValues = ["", TODO_STATUS.NEW, TODO_STATUS.IN_PROGRESS, TODO_STATUS.DONE];
    const statusIndex = vue.ref(0);
    const rawMemberList = vue.ref([]);
    const creatorOptions = vue.ref(["Tất cả"]);
    const creatorIndex = vue.ref(0);
    const assigneeOptions = vue.ref(["Tất cả"]);
    const assigneeIndex = vue.ref(0);
    const sourceOptions = ["Tất cả", "Cuộc gọi", "Khách hàng", "Hội thoại", "Tin nhắn"];
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
        const names = data.map((m) => m.UserName || "Thành viên ẩn");
        creatorOptions.value = ["Tất cả", ...names];
        assigneeOptions.value = ["Tất cả", ...names];
      } catch (error) {
        formatAppLog("error", "at controllers/list_todo.ts:61", "Lỗi lấy danh sách thành viên filter:", error);
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
      isLoading.value = true;
      try {
        const params = {
          ...filter.value,
          pageNo: pageNo.value,
          pageSize: pageSize.value
        };
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
        formatAppLog("error", "at controllers/list_todo.ts:113", error);
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
      isLoading.value = true;
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
        formatAppLog("error", "at controllers/list_todo.ts:187", error);
        showError("Lỗi tải dữ liệu");
        todos.value = [];
      } finally {
        isLoading.value = false;
      }
    };
    const confirmDelete = async () => {
      if (!itemToDelete.value)
        return;
      try {
        await deleteTodo(itemToDelete.value.id);
        showSuccess("Đã xóa thành công");
        isConfirmDeleteOpen.value = false;
        itemToDelete.value = null;
        getTodoList();
      } catch (error) {
        formatAppLog("error", "at controllers/list_todo.ts:203", "Delete Error:", error);
        showError("Xóa thất bại");
      }
    };
    const showActionMenu = (item) => {
      uni.showActionSheet({
        itemList: ["Xóa"],
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
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "StatusBadge",
    props: {
      status: { type: String, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const badgeLabel = vue.computed(() => {
        return STATUS_LABELS[props.status] || props.status || "Không xác định";
      });
      const badgeColorClass = vue.computed(() => {
        switch (props.status) {
          case TODO_STATUS.NEW:
            return "bg-gray-200 text-gray-600";
          case TODO_STATUS.IN_PROGRESS:
            return "bg-orange-100 text-orange-600";
          case TODO_STATUS.DONE:
            return "bg-green-100 text-green-600";
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
          default:
            return { backgroundColor: "#f4f4f5", color: "#a1a1aa" };
        }
      });
      const __returned__ = { props, badgeLabel, badgeColorClass, customStyle };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
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
  const StatusBadge = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-7f144565"], ["__file", "D:/uni_app/vbot-todo-android/components/StatusBadge.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
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
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
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
  const AppButton = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-2f131dae"], ["__file", "D:/uni_app/vbot-todo-android/components/AppButton.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "GlobalMessage",
    setup(__props, { expose: __expose }) {
      __expose();
      const isVisible = vue.ref(false);
      const msgContent = vue.ref("");
      const msgType = vue.ref("success");
      const safeAreaTop = vue.ref(0);
      let timer = null;
      const icons = {
        success: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23047857%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-2%2015l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%3C%2Fsvg%3E",
        error: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23b91c1c%22%3E%3Cpath%20d%3D%22M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%22%2F%3E%3C%2Fsvg%3E",
        info: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%231d4ed8%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm1%2015h-2v-6h2v6zm0-8h-2V7h2v2z%22%2F%3E%3C%2Fsvg%3E",
        warning: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23b45309%22%3E%3Cpath%20d%3D%22M1%2021h22L12%202%201%2021zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z%22%2F%3E%3C%2Fsvg%3E"
      };
      const iconPath = vue.computed(() => {
        return icons[msgType.value] || icons["info"];
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
        }, 2500);
      };
      vue.onMounted(() => {
        const sysInfo = uni.getSystemInfoSync();
        safeAreaTop.value = sysInfo.statusBarHeight || 0;
        uni.$on("app-toast-show", handleShowToast);
      });
      vue.onUnmounted(() => {
        uni.$off("app-toast-show", handleShowToast);
      });
      const __returned__ = { isVisible, msgContent, msgType, safeAreaTop, get timer() {
        return timer;
      }, set timer(v) {
        timer = v;
      }, icons, iconPath, handleShowToast };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
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
  const GlobalMessage = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-2f57c33b"], ["__file", "D:/uni_app/vbot-todo-android/components/GlobalMessage.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
  const ConfirmModal = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-5d0d13a1"], ["__file", "D:/uni_app/vbot-todo-android/components/ConfirmModal.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
            vue.toDisplayString($props.pageSize) + " / trang",
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
        "Tổng: " + vue.toDisplayString($props.total),
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
  const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-813f2b74"], ["__file", "D:/uni_app/vbot-todo-android/components/Pagination.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
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
      const __returned__ = { todos, isLoading, isFilterOpen, filter, isConfirmDeleteOpen, itemToDelete, pageSizeOptions, pageSizeIndex, currentPage, totalPages, onPageSizeChange, changePage, statusOptions, statusIndex, onStatusChange, creatorOptions, creatorIndex, onCreatorChange, customerOptions, customerIndex, onCustomerChange, assigneeOptions, assigneeIndex, onAssigneeChange, sourceOptions, sourceIndex, onSourceChange, addNewTask, openFilter, closeFilter, resetFilter, applyFilter, showActionMenu, cancelDelete, confirmDelete, goToDetail, showCustomerModal, loadingCustomer, customerList, selectedCustomerName, openCustomerPopup, onCustomerSelect, onFilterCustomerInModal, pageNo, pageSize, totalCount, onChangePage, onUpdatePageSize, rawMemberList, loadingMore, loadMoreCustomers, CustomerModal, StatusBadge, DateRangeFilter, AppButton, GlobalMessage, ConfirmModal, Pagination };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "header-left" }),
        vue.createElementVNode("text", { class: "header-title" }, "Công việc"),
        vue.createElementVNode("view", {
          class: "header-right",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.openFilter && $setup.openFilter(...args))
        }, [
          vue.createElementVNode("image", {
            src: "https://img.icons8.com/ios-filled/50/333333/filter--v1.png",
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
            vue.createElementVNode("text", null, "Đang tải dữ liệu...")
          ])) : $setup.todos.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-state"
          }, [
            vue.createElementVNode("image", {
              src: "https://img.icons8.com/ios/100/cccccc/empty-box.png",
              mode: "aspectFit",
              class: "empty-icon"
            }),
            vue.createElementVNode("text", { class: "empty-text" }, "Chưa có dữ liệu")
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
                        onClick: vue.withModifiers(($event) => $setup.showActionMenu(item), ["stop"])
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
                        "Tạo: " + vue.toDisplayString(item.createdAtFormatted),
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
                        "Hết hạn: " + vue.toDisplayString(item.dueDateFormatted),
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
                        "Thông báo: " + vue.toDisplayString(item.notifyAtFormatted),
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
              vue.createElementVNode("text", { class: "add-text" }, "Thêm công việc")
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
            vue.createElementVNode("text", { class: "filter-title" }, "Bộ lọc tìm kiếm"),
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
              vue.createElementVNode("text", { class: "f-label" }, "Tiêu đề / Từ khóa"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "f-input",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.filter.title = $event),
                  placeholder: "Nhập từ khóa..."
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.filter.title]
              ])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode("text", { class: "f-label" }, "Mã công việc"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "f-input",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.filter.jobCode = $event),
                  placeholder: "Ví dụ: TODO-08"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $setup.filter.jobCode]
              ])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode("text", { class: "f-label" }, "Trạng thái"),
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
              vue.createElementVNode("text", { class: "f-label" }, "Người tạo"),
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
              vue.createElementVNode("text", { class: "f-label" }, "Khách hàng"),
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
                  vue.toDisplayString($setup.selectedCustomerName || "Chọn khách hàng"),
                  5
                  /* TEXT, STYLE */
                ),
                vue.createElementVNode("text", { class: "arrow" }, "›")
              ])
            ]),
            vue.createElementVNode("view", { class: "f-group" }, [
              vue.createElementVNode("text", { class: "f-label" }, "Người được giao"),
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
              vue.createElementVNode("text", { class: "f-label" }, "Nguồn"),
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
              title: "Thời gian tạo",
              startDate: $setup.filter.createdFrom,
              "onUpdate:startDate": _cache[10] || (_cache[10] = ($event) => $setup.filter.createdFrom = $event),
              endDate: $setup.filter.createdTo,
              "onUpdate:endDate": _cache[11] || (_cache[11] = ($event) => $setup.filter.createdTo = $event)
            }, null, 8, ["startDate", "endDate"]),
            vue.createVNode($setup["DateRangeFilter"], {
              title: "Thời gian hết hạn",
              startDate: $setup.filter.dueDateFrom,
              "onUpdate:startDate": _cache[12] || (_cache[12] = ($event) => $setup.filter.dueDateFrom = $event),
              endDate: $setup.filter.dueDateTo,
              "onUpdate:endDate": _cache[13] || (_cache[13] = ($event) => $setup.filter.dueDateTo = $event)
            }, null, 8, ["startDate", "endDate"]),
            vue.createVNode($setup["DateRangeFilter"], {
              title: "Thời gian thông báo",
              startDate: $setup.filter.notifyFrom,
              "onUpdate:startDate": _cache[14] || (_cache[14] = ($event) => $setup.filter.notifyFrom = $event),
              endDate: $setup.filter.notifyTo,
              "onUpdate:endDate": _cache[15] || (_cache[15] = ($event) => $setup.filter.notifyTo = $event)
            }, null, 8, ["startDate", "endDate"]),
            vue.createElementVNode("view", { style: { "height": "20px" } })
          ]),
          vue.createElementVNode("view", { class: "filter-footer" }, [
            vue.createVNode($setup["AppButton"], {
              type: "secondary",
              label: "Đặt lại",
              class: "btn-filter-reset",
              onClick: $setup.resetFilter
            }, null, 8, ["onClick"]),
            vue.createVNode($setup["AppButton"], {
              type: "primary",
              label: "Áp dụng",
              class: "btn-filter-apply",
              onClick: $setup.applyFilter
            }, null, 8, ["onClick"])
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
        title: "Thông báo",
        message: `Bạn có chắc muốn xóa công việc "${(_a = $setup.itemToDelete) == null ? void 0 : _a.title}"?`,
        "confirm-type": "danger",
        onConfirm: $setup.confirmDelete,
        onCancel: $setup.cancelDelete
      }, null, 8, ["visible", "message", "onConfirm", "onCancel"]),
      vue.createVNode($setup["GlobalMessage"])
    ]);
  }
  const PagesTodoListTodo = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-1b4e60ea"], ["__file", "D:/uni_app/vbot-todo-android/pages/todo/list_todo.vue"]]);
  const dateToTimestamp = (dateStr) => {
    if (!dateStr)
      return -1;
    const safeDateStr = dateStr.replace(/\//g, "-");
    const dateObj = new Date(safeDateStr);
    return isNaN(dateObj.getTime()) ? -1 : dateObj.getTime();
  };
  const buildCreateTodoPayload = (form, config) => {
    const fullNotifyDateTime = `${form.notifyDate} ${form.notifyTime || "00:00"}`;
    const fullDueDate = form.dueDate;
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
      dueDate: dateToTimestamp(fullDueDate),
      notificationReceivedAt: dateToTimestamp(fullNotifyDateTime)
    };
  };
  const useCreateTodoController = () => {
    useAuthStore();
    const pad = (n) => n.toString().padStart(2, "0");
    const getTodayISO = () => {
      const d = /* @__PURE__ */ new Date();
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };
    const getCurrentTime = () => {
      const d = /* @__PURE__ */ new Date();
      return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
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
      dueDate: getTodayISO(),
      notifyDate: getTodayISO(),
      notifyTime: getCurrentTime()
    });
    const sourceOptions = ["Cuộc gọi", "Khách hàng", "Hội thoại"];
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
        formatAppLog("error", "at controllers/create_todo.ts:63", "Lỗi lấy thành viên:", error);
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
            formatAppLog("error", "at controllers/create_todo.ts:115", `Upload ảnh ${src} lỗi:`, err);
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
        showInfo("Vui lòng nhập tên công việc");
        return;
      }
      let selectedLink = "CALL";
      if (sourceIndex.value >= 0) {
        selectedLink = sourceValues[sourceIndex.value];
      }
      loading.value = true;
      showLoading("Đang xử lý dữ liệu...");
      try {
        const { newContent, fileUrls } = await processDescriptionImages(form.value.desc);
        form.value.desc = newContent;
        const payload = buildCreateTodoPayload(form.value, {
          projectCode: PROJECT_CODE,
          uid: UID,
          link: selectedLink,
          uploadedFiles: fileUrls.length > 0 ? fileUrls[0] : ""
        });
        formatAppLog("log", "at controllers/create_todo.ts:158", "Payload Submit:", payload);
        await createTodo(payload);
        hideLoading();
        showSuccess("Tạo thành công!");
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } catch (error) {
        hideLoading();
        formatAppLog("error", "at controllers/create_todo.ts:168", "Create Error:", error);
        const errorMsg = (error == null ? void 0 : error.message) || (typeof error === "string" ? error : "Thất bại");
        showError("Lỗi: " + errorMsg);
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
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "TodoEditor",
    props: {
      modelValue: String,
      placeholder: { type: String, default: "Nhập nội dung..." }
    },
    emits: ["update:modelValue"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
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
      const showLinkModal = vue.ref(false);
      const linkUrl = vue.ref("");
      const showColorModal = vue.ref(false);
      const colorTab = vue.ref("color");
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
        format(item.name, item.value);
      };
      const applyColor = (color) => {
        if (color) {
          format(colorTab.value, color);
        } else {
          format(colorTab.value, null);
        }
        showColorModal.value = false;
      };
      const closeColorModal = () => {
        showColorModal.value = false;
      };
      const isColorSelected = (color) => {
        return formats.value[colorTab.value] === color;
      };
      const handleAlignSetting = () => {
        const options = ["Căn trái", "Căn giữa", "Căn phải", "Căn đều"];
        uni.showActionSheet({
          itemList: options,
          success: (res) => {
            const index = res.tapIndex;
            if (index === 0)
              format("align", "left");
            if (index === 1)
              format("align", "center");
            if (index === 2)
              format("align", "right");
            if (index === 3)
              format("align", "justify");
          }
        });
      };
      const handleFontSizeSetting = () => {
        const options = ["Nhỏ", "Bình thường", "Lớn", "Rất lớn"];
        uni.showActionSheet({
          itemList: options,
          success: (res) => {
            const index = res.tapIndex;
            if (index === 0)
              format("fontSize", "small");
            if (index === 1)
              format("fontSize", null);
            if (index === 2)
              format("fontSize", "large");
            if (index === 3)
              format("fontSize", "huge");
          }
        });
      };
      const handleHeaderSetting = () => {
        const options = ["Tiêu đề 1 (H1)", "Tiêu đề 2 (H2)", "Tiêu đề 3 (H3)", "Tiêu đề 4 (H4)", "Tiêu đề 5 (H5)", "Tiêu đề 6 (H6)", "Văn bản thường"];
        uni.showActionSheet({
          itemList: options,
          success: (res) => {
            if (res.tapIndex < 6) {
              format("header", res.tapIndex + 1);
            } else {
              format("header", null);
            }
          }
        });
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
      const onEditorReady = () => {
        uni.createSelectorQuery().in(instance).select(`#${editorId.value}`).context((res) => {
          if (res && res.context) {
            editorCtx.value = res.context;
            if (props.modelValue)
              editorCtx.value.setContents({ html: props.modelValue });
          }
        }).exec();
      };
      const onInput = (e) => {
        const val = e.detail.html;
        lastVal.value = val;
        emit("update:modelValue", val);
      };
      const onStatusChange = (e) => {
        formats.value = e.detail;
        isLinkSelected.value = !!e.detail.link;
      };
      const format = (name, value = null) => {
        if (!editorCtx.value)
          return;
        editorCtx.value.format(name, value);
      };
      const insertImage = () => {
        uni.showActionSheet({
          itemList: ["Chụp ảnh mới", "Chọn từ thư viện"],
          success: (res) => {
            const index = res.tapIndex;
            let source = "album";
            if (index === 0)
              source = "camera";
            if (index === 1)
              source = "album";
            uni.chooseImage({
              count: 1,
              sourceType: [source],
              success: (imageRes) => {
                const tempPath = imageRes.tempFilePaths[0];
                if (editorCtx.value) {
                  editorCtx.value.insertImage({
                    src: tempPath,
                    width: "80%",
                    alt: "image"
                  });
                }
              }
            });
          }
        });
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
      const lastVal = vue.ref("");
      vue.watch(() => props.modelValue, (val) => {
        if (val !== lastVal.value && editorCtx.value) {
          if (!val) {
            editorCtx.value.clear();
          } else {
            editorCtx.value.setContents({
              html: val
            });
          }
          lastVal.value = val || "";
        }
      });
      const __returned__ = { props, emit, tools, colorList, editorId, editorCtx, formats, instance, isLinkSelected, showLinkModal, linkUrl, showColorModal, colorTab, getDisplayText, getDisplayImage, handleToolClick, applyColor, closeColorModal, isColorSelected, handleAlignSetting, handleFontSizeSetting, handleHeaderSetting, isActive, onEditorReady, onInput, onStatusChange, format, insertImage, handleLink, confirmLink, clearFormat, lastVal };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "editor-container" }, [
      vue.createElementVNode("editor", {
        id: $setup.editorId,
        class: "ql-container",
        placeholder: $props.placeholder,
        "show-img-size": "",
        "show-img-toolbar": "",
        "show-img-resize": "",
        onReady: $setup.onEditorReady,
        onInput: $setup.onInput,
        onStatuschange: $setup.onStatusChange
      }, null, 40, ["id", "placeholder"]),
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
        key: 0,
        class: "modal-overlay",
        onClick: _cache[3] || (_cache[3] = ($event) => $setup.showLinkModal = false)
      }, [
        vue.createElementVNode("view", {
          class: "modal-box",
          onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("text", { class: "modal-title" }, "Chèn liên kết"),
          vue.withDirectives(vue.createElementVNode("input", {
            class: "modal-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.linkUrl = $event),
            placeholder: "https://example.com",
            focus: $setup.showLinkModal
          }, null, 8, ["focus"]), [
            [vue.vModelText, $setup.linkUrl]
          ]),
          vue.createElementVNode("view", { class: "modal-actions" }, [
            vue.createElementVNode("button", {
              class: "btn-cancel",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.showLinkModal = false)
            }, "Hủy"),
            vue.createElementVNode("button", {
              class: "btn-confirm",
              onClick: $setup.confirmLink
            }, "Xác nhận")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $setup.showColorModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: $setup.closeColorModal
      }, [
        vue.createElementVNode("view", {
          class: "modal-box color-box",
          onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "color-tabs" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["color-tab", { active: $setup.colorTab === "color" }]),
                onClick: _cache[4] || (_cache[4] = ($event) => $setup.colorTab = "color")
              },
              " Màu chữ ",
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["color-tab", { active: $setup.colorTab === "backgroundColor" }]),
                onClick: _cache[5] || (_cache[5] = ($event) => $setup.colorTab = "backgroundColor")
              },
              " Màu nền ",
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("view", { class: "color-grid" }, [
            vue.createElementVNode("view", {
              class: "color-circle no-color",
              onClick: _cache[6] || (_cache[6] = ($event) => $setup.applyColor(""))
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
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const TodoEditor = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-7d79903f"], ["__file", "D:/uni_app/vbot-todo-android/components/Todo/TodoEditor.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "TodoDatePicker",
    props: {
      dueDate: { type: String, required: true },
      notifyDate: { type: String, required: true },
      notifyTime: { type: String, required: true }
    },
    emits: ["update:dueDate", "update:notifyDate", "update:notifyTime", "change"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const onDateChange = (e, field) => {
        emit(`update:${field}`, e.detail.value);
        setTimeout(() => {
          emit("change", { field, value: e.detail.value });
        }, 50);
      };
      const formatDateDisplay2 = (isoStr) => {
        if (!isoStr)
          return "";
        try {
          if (isoStr.includes("-")) {
            const [y, m, d] = isoStr.split("-");
            return `${d}/${m}/${y}`;
          }
          return isoStr;
        } catch (e) {
          return isoStr;
        }
      };
      const __returned__ = { props, emit, onDateChange, formatDateDisplay: formatDateDisplay2 };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "flat-item date-compound-block" }, [
      vue.createElementVNode("view", { class: "right-column" }, [
        vue.createElementVNode("view", { class: "date-row" }, [
          vue.createElementVNode("picker", {
            mode: "date",
            value: $props.dueDate,
            onChange: _cache[0] || (_cache[0] = ($event) => $setup.onDateChange($event, "dueDate")),
            onCancel: () => {
            },
            class: "full-width-picker"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["item-picker", { "placeholder-color": !$props.dueDate }])
              },
              [
                vue.createElementVNode("text", { class: "picker-label" }, "Hạn xử lý:"),
                vue.createTextVNode(
                  " " + vue.toDisplayString($props.dueDate ? $setup.formatDateDisplay($props.dueDate) : "Chọn ngày"),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ], 40, ["value"])
        ]),
        vue.createElementVNode("view", { class: "inner-divider" }),
        vue.createElementVNode("view", { class: "date-row split-row" }, [
          vue.createElementVNode("picker", {
            mode: "date",
            value: $props.notifyDate,
            onChange: _cache[1] || (_cache[1] = ($event) => $setup.onDateChange($event, "notifyDate")),
            class: "half-picker"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["item-picker", { "placeholder-color": !$props.notifyDate }])
              },
              [
                vue.createElementVNode("text", { class: "picker-label" }, "Ngày thông báo:"),
                vue.createTextVNode(
                  " " + vue.toDisplayString($props.notifyDate ? $setup.formatDateDisplay($props.notifyDate) : "Ngày"),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ], 40, ["value"]),
          vue.createElementVNode("view", { class: "vertical-divider" }),
          vue.createElementVNode("picker", {
            mode: "time",
            value: $props.notifyTime,
            onChange: _cache[2] || (_cache[2] = ($event) => $setup.onDateChange($event, "notifyTime")),
            class: "half-picker"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["item-picker", { "placeholder-color": !$props.notifyTime }])
              },
              vue.toDisplayString($props.notifyTime ? $props.notifyTime : "Giờ"),
              3
              /* TEXT, CLASS */
            )
          ], 40, ["value"])
        ])
      ])
    ]);
  }
  const TodoDatePicker = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-245edb6a"], ["__file", "D:/uni_app/vbot-todo-android/components/Todo/TodoDatePicker.vue"]]);
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
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            class: "item-input title-textarea",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.name = $event),
            placeholder: "Nhập tên công việc... *",
            maxlength: "256",
            "auto-height": ""
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.form.name]
        ]),
        vue.createElementVNode(
          "text",
          { class: "char-count" },
          vue.toDisplayString($setup.form.name ? $setup.form.name.length : 0) + "/256 ",
          1
          /* TEXT */
        )
      ]),
      vue.createVNode($setup["TodoEditor"], {
        modelValue: $setup.form.desc,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.desc = $event)
      }, null, 8, ["modelValue"]),
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
          vue.toDisplayString($setup.form.customer || "Chọn khách hàng"),
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
            vue.toDisplayString($setup.sourceIndex > -1 ? $setup.sourceOptions[$setup.sourceIndex] : "Chọn nguồn"),
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
            vue.toDisplayString($setup.currentAssigneeName ? $setup.currentAssigneeName : "Người được giao"),
            3
            /* TEXT, CLASS */
          )
        ], 40, ["range"])
      ]),
      vue.createVNode($setup["TodoDatePicker"], {
        dueDate: $setup.form.dueDate,
        "onUpdate:dueDate": _cache[6] || (_cache[6] = ($event) => $setup.form.dueDate = $event),
        notifyDate: $setup.form.notifyDate,
        "onUpdate:notifyDate": _cache[7] || (_cache[7] = ($event) => $setup.form.notifyDate = $event),
        notifyTime: $setup.form.notifyTime,
        "onUpdate:notifyTime": _cache[8] || (_cache[8] = ($event) => $setup.form.notifyTime = $event)
      }, null, 8, ["dueDate", "notifyDate", "notifyTime"]),
      vue.createElementVNode("view", { class: "footer-action" }, [
        vue.createVNode($setup["AppButton"], {
          type: "secondary",
          label: "Hủy bỏ",
          class: "btn-cancel",
          onClick: $setup.goBack
        }, null, 8, ["onClick"]),
        vue.createVNode($setup["AppButton"], {
          type: "primary",
          label: $setup.loading ? "Đang lưu..." : "Lưu công việc",
          loading: $setup.loading,
          class: "btn-submit",
          onClick: $setup.submitForm
        }, null, 8, ["label", "loading", "onClick"])
      ]),
      vue.createVNode($setup["GlobalMessage"])
    ]);
  }
  const PagesTodoCreateTodo = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/uni_app/vbot-todo-android/pages/todo/create_todo.vue"]]);
  const timestampToDateStr = (ts) => {
    if (!ts || ts <= 0)
      return "";
    try {
      const date = new Date(ts);
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, "0");
      const d = date.getDate().toString().padStart(2, "0");
      return `${y}-${m}-${d}`;
    } catch {
      return "";
    }
  };
  const timestampToTimeStr = (ts) => {
    if (!ts || ts <= 0)
      return "";
    try {
      const date = new Date(ts);
      const h = date.getHours().toString().padStart(2, "0");
      const min = date.getMinutes().toString().padStart(2, "0");
      return `${h}:${min}`;
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
    const notiTimestamp = apiData.notificationReceivedAt || 0;
    return {
      id: apiData.id,
      title: apiData.title || "",
      code: apiData.code || "",
      desc: apiData.description || "",
      statusIndex: sIndex,
      sourceIndex: srcIndex,
      assigneeIndex: 0,
      assigneeId: apiData.assigneeId || "",
      dueDate: timestampToDateStr(apiData.dueDate),
      notifyDate: timestampToDateStr(notiTimestamp),
      notifyTime: timestampToTimeStr(notiTimestamp),
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
    const authStore = useAuthStore();
    const currentUserId = authStore.uid;
    const isLoading = vue.ref(false);
    const isLoadingCustomer = vue.ref(false);
    const isLoadingHistory = vue.ref(false);
    const historyList = vue.ref([]);
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
    const commentFilterOptions = ["Tất cả hoạt động", "Bình luận"];
    const commentFilterValues = ["", "COMMENT"];
    const isSavingDescription = vue.ref(false);
    const convertToTimestamp = (dateStr, timeStr = "00:00") => {
      if (!dateStr)
        return 0;
      try {
        const dateTimeStr = `${dateStr}T${timeStr}:00`;
        return new Date(dateTimeStr).getTime();
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
      showLoading("Đang cập nhật...");
      try {
        const payload = {
          ...form.value.raw,
          preFixCode: "TODO",
          description: form.value.desc,
          files: "",
          tagCodes: "",
          title: form.value.title || form.value.raw.title
        };
        if (event.field === "dueDate") {
          payload.dueDate = convertToTimestamp(event.value, "23:59");
        } else if (event.field === "notifyDate" || event.field === "notifyTime") {
          const datePart = event.field === "notifyDate" ? event.value : form.value.notifyDate;
          const timePart = event.field === "notifyTime" ? event.value : form.value.notifyTime;
          if (datePart && timePart) {
            payload.notificationReceivedAt = convertToTimestamp(datePart, timePart);
          }
        }
        formatAppLog("log", "at controllers/todo_detail.ts:116", `Payload Update ${event.field}:`, payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess("Cập nhật thành công");
          if (event.field === "dueDate") {
            form.value.raw.dueDate = payload.dueDate;
          } else {
            form.value.raw.notificationReceivedAt = payload.notificationReceivedAt;
          }
          if (form.value.customerCode)
            await fetchHistoryLog(form.value.customerCode);
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:134", "Lỗi cập nhật ngày:", error);
        showError("Lỗi cập nhật");
      } finally {
        hideLoading();
      }
    };
    const processDescriptionImages = async (htmlContent) => {
      if (!htmlContent)
        return "";
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      const promises = [];
      const replacements = [];
      while ((match = imgRegex.exec(htmlContent)) !== null) {
        const src = match[1];
        if (!src.startsWith("http") && !src.startsWith("https")) {
          const uploadPromise = uploadTodoFile(src).then((serverUrl) => {
            replacements.push({ oldSrc: src, newSrc: serverUrl });
          }).catch((err) => {
            formatAppLog("error", "at controllers/todo_detail.ts:158", `Upload ảnh detail lỗi:`, err);
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
      return newHtml;
    };
    const onSaveDescription = async () => {
      if (!form.value.raw) {
        showError("Không tìm thấy dữ liệu gốc");
        return;
      }
      isSavingDescription.value = true;
      showLoading("Đang lưu...");
      try {
        const processedDesc = await processDescriptionImages(form.value.desc);
        form.value.desc = processedDesc;
        const payload = {
          ...form.value.raw,
          preFixCode: "TODO",
          description: form.value.desc,
          // HTML giờ chứa link https://...
          files: "",
          tagCodes: "",
          title: form.value.title || form.value.raw.title
        };
        formatAppLog("log", "at controllers/todo_detail.ts:201", "Payload Update Todo:", payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess("Đã cập nhật mô tả");
          form.value.raw.description = form.value.desc;
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:211", "Lỗi cập nhật công việc:", error);
        showError("Cập nhật thất bại");
      } finally {
        hideLoading();
        isSavingDescription.value = false;
      }
    };
    const onRequestReply = async (item) => {
      isEditingComment.value = false;
      editingCommentData.value = null;
      newCommentText.value = "";
      replyingCommentData.value = item;
      isReplying.value = true;
      const senderId = item.senderId;
      const foundMember = memberList.value.find((m) => m.UID === senderId);
      if (foundMember) {
        replyingMemberName.value = foundMember.UserName;
      } else {
        replyingMemberName.value = "Người dùng ẩn";
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
      if (!newCommentText.value || !newCommentText.value.trim()) {
        showInfo("Vui lòng nhập nội dung");
        return;
      }
      if (!replyingCommentData.value)
        return;
      isSubmittingComment.value = true;
      try {
        const todoId = form.value.id;
        const senderId = authStore.uid;
        let apiParentId = replyingCommentData.value.id;
        if (replyingCommentData.value.rootParentId) {
          apiParentId = replyingCommentData.value.rootParentId;
        }
        const payload = {
          todoId,
          senderId,
          message: newCommentText.value,
          files: "",
          parentId: apiParentId
        };
        formatAppLog("log", "at controllers/todo_detail.ts:283", ">> Gửi trả lời:", payload);
        const res = await createTodoMessage(payload);
        if (res) {
          showSuccess("Đã trả lời");
          resetReplyState();
          await fetchComments(todoId);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:293", "Lỗi gửi trả lời:", error);
        showError("Gửi thất bại");
      } finally {
        isSubmittingComment.value = false;
      }
    };
    const resetReplyState = () => {
      isReplying.value = false;
      replyingCommentData.value = null;
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
      formatAppLog("log", "at controllers/todo_detail.ts:334", ">> Gửi Reaction:", payload);
      try {
        const res = await reactionTodoMessage(payload);
        if (res) {
          showSuccess("Đã thả cảm xúc");
          await fetchComments(todoId);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:345", "Lỗi thả cảm xúc:", error);
        showError("Lỗi kết nối");
      }
    };
    const editingCommentData = vue.ref(null);
    const historyFilterIndex = vue.ref(0);
    const historyFilterOptions = [
      "Tất cả",
      "Công việc",
      "Ticket",
      "Lịch sử gọi",
      "Khách hàng",
      "Ghi chú"
    ];
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
      code: "Loading...",
      desc: "",
      statusIndex: 0,
      sourceIndex: 0,
      assigneeIndex: 0,
      assigneeId: "",
      dueDate: "",
      notifyDate: "",
      notifyTime: "",
      customerCode: "",
      customerName: "",
      customerNameLabel: "",
      customerPhone: "",
      customerPhoneLabel: "",
      customerManagerName: "",
      customerManagerLabel: ""
    });
    const sourceOptions = ["Cuộc gọi", "Khách hàng", "Hội thoại", "Tin nhắn"];
    const memberList = vue.ref([]);
    const assigneeOptions = vue.ref([]);
    const dynamicStatusOptions = vue.computed(() => {
      const options = [
        { label: "Chưa xử lý", value: "TO_DO" },
        { label: "Đang xử lý", value: "IN_PROGRESS" },
        { label: "Hoàn thành", value: "DONE" }
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
      showLoading("Đang tải...");
      try {
        const res = await getTodoMessageDetail(commentId, todoId);
        formatAppLog("log", "at controllers/todo_detail.ts:412", "API Response Detail:", res);
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
            editingMemberName.value = "tôi";
          }
          const content = dataDetail.message || "";
          formatAppLog("log", "at controllers/todo_detail.ts:438", "Nội dung edit:", content);
          isEditingComment.value = true;
          await vue.nextTick();
          newCommentText.value = content;
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:449", "Lỗi lấy chi tiết bình luận:", error);
        showError("Lỗi tải dữ liệu");
      } finally {
        uni.hideLoading();
      }
    };
    const submitUpdateComment = async () => {
      if (!editingCommentData.value)
        return;
      if (!newCommentText.value || !newCommentText.value.trim()) {
        showInfo("Nội dung không được để trống");
        return;
      }
      isSubmittingComment.value = true;
      try {
        const payload = {
          id: editingCommentData.value.id,
          todoId: editingCommentData.value.todoId,
          senderId: editingCommentData.value.senderId,
          message: newCommentText.value,
          files: ""
        };
        formatAppLog("log", "at controllers/todo_detail.ts:475", "Payload Update:", payload);
        await updateTodoMessage(payload);
        showSuccess("Đã cập nhật");
        resetEditState();
        await fetchComments(form.value.id);
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:486", "Lỗi cập nhật:", error);
        showError("Cập nhật thất bại");
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
      isConfirmDeleteCommentOpen.value = false;
      try {
        await deleteTodoMessage(commentToDeleteId.value);
        showSuccess("Đã xóa");
        if (form.value.id) {
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:539", "Lỗi xóa bình luận:", error);
        showError("Xóa thất bại");
      } finally {
        commentToDeleteId.value = null;
      }
    };
    const cancelDeleteComment = () => {
      isConfirmDeleteCommentOpen.value = false;
      commentToDeleteId.value = null;
    };
    const submitComment = async () => {
      if (!newCommentText.value || !newCommentText.value.trim()) {
        showInfo("Vui lòng nhập nội dung");
        return;
      }
      isSubmittingComment.value = true;
      try {
        const todoId = form.value.id;
        const senderId = authStore.uid;
        const payload = {
          todoId,
          senderId,
          message: newCommentText.value,
          files: "",
          parentId: -1
        };
        formatAppLog("log", "at controllers/todo_detail.ts:574", "Đang gửi bình luận:", payload);
        const res = await createTodoMessage(payload);
        if (res) {
          showSuccess("Đã gửi bình luận");
          newCommentText.value = "";
          await fetchComments(todoId);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:589", "Lỗi gửi bình luận:", error);
        showError("Gửi thất bại");
      } finally {
        isSubmittingComment.value = false;
      }
    };
    onLoad(async (options) => {
      await fetchMembers();
      if (options && options.id) {
        await fetchDetail(options.id);
      }
    });
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        memberList.value = data;
        assigneeOptions.value = data.map((m) => m.UserName || "Thành viên ẩn danh");
      } catch (e) {
        formatAppLog("error", "at controllers/todo_detail.ts:611", "Lỗi lấy members", e);
      }
    };
    const fetchDetail = async (id) => {
      isLoading.value = true;
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
          fetchComments(id);
          if (form.value.assigneeId && memberList.value.length > 0) {
            const index = memberList.value.findIndex((m) => m.memberUID === form.value.assigneeId);
            if (index !== -1)
              form.value.assigneeIndex = index;
          }
          if (form.value.customerCode) {
            await fetchCustomerInfo(form.value.customerCode);
            fetchHistoryLog(form.value.customerCode);
          }
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:645", " Lỗi lấy chi tiết:", error);
        showError("Lỗi kết nối");
      } finally {
        isLoading.value = false;
      }
    };
    const processCommentData = (item) => {
      var _a;
      let senderName = "Người dùng ẩn";
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
        actionText = "đã thêm một bình luận";
      else if (item.type === "LOG")
        actionText = "đã cập nhật hoạt động";
      else if (item.type === "UPDATE_TODO")
        actionText = "cập nhật thông tin công việc";
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
        formatAppLog("error", "at controllers/todo_detail.ts:716", "Lỗi lấy bình luận:", error);
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
          form.value.customerNameLabel = nameField.name;
        }
        if (phoneField) {
          form.value.customerPhone = phoneField.value;
          form.value.customerPhoneLabel = phoneField.name;
        }
        if (managerField) {
          form.value.customerManagerLabel = managerField.name;
          const managerUid = managerField.value;
          const manager = memberList.value.find((m) => m.memberUID === managerUid);
          form.value.customerManagerName = manager ? manager.UserName : "(Chưa xác định)";
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:773", "Lỗi CRM:", error);
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
          formatAppLog("error", "at controllers/todo_detail.ts:785", "Chưa có Token CRM/Todo");
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
            let actorName = "Hệ thống";
            if (item.memberUid) {
              const foundMember = memberList.value.find((m) => m.memberUID === item.memberUid);
              if (foundMember) {
                actorName = foundMember.UserName;
              }
            }
            const content = TIMELINE_TYPE_MAP[item.typeSub] || item.typeSub || "Tương tác khác";
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
        formatAppLog("error", "at controllers/todo_detail.ts:823", "Lỗi lấy lịch sử:", error);
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
      showLoading("Đang cập nhật...");
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
        formatAppLog("log", "at controllers/todo_detail.ts:870", "Payload Update Status:", payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess("Đã cập nhật trạng thái");
          form.value.raw.status = newStatus;
          const newDisplayIndex = dynamicStatusOptions.value.findIndex((opt) => opt.value === newStatus);
          form.value.statusIndex = newDisplayIndex !== -1 ? newDisplayIndex : 0;
          if (form.value.customerCode)
            await fetchHistoryLog(form.value.customerCode);
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:886", "Lỗi cập nhật trạng thái:", error);
        showError("Lỗi cập nhật");
      } finally {
        uni.hideLoading();
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
        showError("Thiếu dữ liệu gốc");
        return;
      }
      showLoading("Đang cập nhật người giao...");
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
        formatAppLog("log", "at controllers/todo_detail.ts:929", "Payload Update Assignee:", payload);
        const res = await updateTodo(payload);
        if (res) {
          showSuccess("Đã đổi người thực hiện");
          form.value.raw.assigneeId = newAssigneeId;
          if (form.value.customerCode) {
            await fetchHistoryLog(form.value.customerCode);
          }
          await fetchComments(form.value.id);
        }
      } catch (error) {
        formatAppLog("error", "at controllers/todo_detail.ts:947", "Lỗi cập nhật người giao:", error);
        showError("Lỗi cập nhật");
      } finally {
        hideLoading();
      }
    };
    const goBack = () => {
      uni.navigateBack();
    };
    const saveTodo = () => {
      formatAppLog("log", "at controllers/todo_detail.ts:955", "Lưu:", form.value);
      showSuccess("Đã lưu");
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
      dynamicStatusOptions
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
      const onPreviewImage = (url) => {
        if (!url)
          return;
        uni.previewImage({
          urls: [url],
          current: 0
        });
      };
      const __returned__ = { props, emit, authStore, isMe, onPreviewImage, UserAvatar, CommentItem };
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
              nodes: $props.data.message,
              class: "text-sm text-gray-700 leading-normal"
            }, null, 8, ["nodes"]),
            $props.data.files ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
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
  const CommentItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-8cb873be"], ["__file", "D:/uni_app/vbot-todo-android/components/Todo/CommentItem.vue"]]);
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
        isStatusDisabled
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
      const __returned__ = { isLoading, isLoadingCustomer, isLoadingHistory, historyList, form, statusOptions, sourceOptions, assigneeOptions, onStatusChange, onSourceChange, onAssigneeChange, saveTodo, historyFilterOptions, historyFilterIndex, onHistoryFilterChange, comments, isLoadingComments, newCommentText, isSubmittingComment, submitComment, isConfirmDeleteCommentOpen, onRequestDeleteComment, confirmDeleteComment, cancelDeleteComment, currentUserId, isEditingComment, onRequestEditComment, submitUpdateComment, onCancelEditComment, isConfirmCancelEditOpen, continueEditing, confirmCancelEdit, editingMemberName, isEmojiPickerOpen, emojiList, onToggleEmojiPicker, closeEmojiPicker, selectEmoji, isReplying, replyingMemberName, replyingCommentData, onRequestReply, onCancelReply, submitReply, isConfirmCancelReplyOpen, continueReplying, confirmCancelReply, commentFilterIndex, commentFilterOptions, onCommentFilterChange, isSavingDescription, onSaveDescription, onDateUpdate, isStatusDisabled, isCommentsOpen, scrollTarget, toggleComments, scrollToInput, handleReply, handleEdit, TodoEditor, TodoDatePicker, CommentItem, AppButton, GlobalMessage, ConfirmModal };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      $setup.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "loading-overlay"
      }, [
        vue.createElementVNode("text", null, "Đang tải...")
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "detail-header" }, [
        vue.createElementVNode("view", { class: "header-top" }, [
          vue.createElementVNode(
            "text",
            { class: "header-code" },
            "#" + vue.toDisplayString($setup.form.code),
            1
            /* TEXT */
          )
        ]),
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            class: "header-title-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.form.title = $event),
            placeholder: "Tên công việc",
            "auto-height": "",
            maxlength: "256"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.form.title]
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "detail-body",
        "scroll-into-view": $setup.scrollTarget,
        "scroll-with-animation": ""
      }, [
        vue.createElementVNode("view", { class: "section-title" }, "Mô tả"),
        vue.createElementVNode("view", { class: "section-block" }, [
          vue.createVNode($setup["TodoEditor"], {
            modelValue: $setup.form.desc,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.desc = $event),
            placeholder: "Nhập mô tả công việc..."
          }, null, 8, ["modelValue"]),
          vue.createElementVNode("view", {
            class: "input-actions",
            style: { "margin-top": "10px" }
          }, [
            vue.createVNode($setup["AppButton"], {
              type: "primary",
              size: "small",
              loading: $setup.isSavingDescription,
              label: $setup.isSavingDescription ? "Đang lưu..." : "Lưu lại",
              onClick: $setup.onSaveDescription
            }, null, 8, ["loading", "label", "onClick"])
          ])
        ]),
        vue.createElementVNode("view", { class: "section-title" }, "Thông tin công việc"),
        vue.createElementVNode("view", { class: "info-group" }, [
          vue.createElementVNode("view", { class: "flat-item" }, [
            vue.createElementVNode("view", { class: "item-left" }, [
              vue.createElementVNode("image", {
                src: "https://img.icons8.com/ios/50/666666/checked-checkbox.png",
                class: "item-icon"
              }),
              vue.createElementVNode("text", { class: "item-label" }, "Trạng thái")
            ]),
            vue.createElementVNode("picker", {
              mode: "selector",
              range: $setup.statusOptions,
              value: $setup.form.statusIndex,
              disabled: $setup.isStatusDisabled,
              onChange: _cache[2] || (_cache[2] = (...args) => $setup.onStatusChange && $setup.onStatusChange(...args)),
              class: "item-picker-box"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["picker-text", { "disabled-text": $setup.isStatusDisabled }])
                },
                [
                  vue.createTextVNode(
                    vue.toDisplayString($setup.statusOptions[$setup.form.statusIndex]) + " ",
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
              vue.createElementVNode("text", { class: "item-label" }, "Nguồn")
            ]),
            vue.createElementVNode("view", { class: "item-picker-box" }, [
              vue.createElementVNode(
                "view",
                { class: "picker-text disabled-text" },
                vue.toDisplayString($setup.sourceOptions[$setup.form.sourceIndex] || "Không xác định"),
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
              vue.createElementVNode("text", { class: "item-label" }, "Người được giao")
            ]),
            vue.createElementVNode("picker", {
              mode: "selector",
              range: $setup.assigneeOptions,
              value: $setup.form.assigneeIndex,
              onChange: _cache[3] || (_cache[3] = (...args) => $setup.onAssigneeChange && $setup.onAssigneeChange(...args)),
              class: "item-picker-box"
            }, [
              vue.createElementVNode(
                "view",
                { class: "picker-text" },
                vue.toDisplayString(
                  $setup.form.assigneeIndex > -1 && $setup.assigneeOptions[$setup.form.assigneeIndex] ? $setup.assigneeOptions[$setup.form.assigneeIndex] : "Chọn người giao"
                ) + " ▾ ",
                1
                /* TEXT */
              )
            ], 40, ["range", "value"])
          ]),
          vue.createVNode($setup["TodoDatePicker"], {
            dueDate: $setup.form.dueDate,
            "onUpdate:dueDate": _cache[4] || (_cache[4] = ($event) => $setup.form.dueDate = $event),
            notifyDate: $setup.form.notifyDate,
            "onUpdate:notifyDate": _cache[5] || (_cache[5] = ($event) => $setup.form.notifyDate = $event),
            notifyTime: $setup.form.notifyTime,
            "onUpdate:notifyTime": _cache[6] || (_cache[6] = ($event) => $setup.form.notifyTime = $event),
            onChange: $setup.onDateUpdate
          }, null, 8, ["dueDate", "notifyDate", "notifyTime", "onChange"])
        ]),
        vue.createElementVNode("view", { class: "section-title" }, "Thông tin khách hàng"),
        vue.createElementVNode("view", { class: "info-group customer-block" }, [
          $setup.isLoadingCustomer ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-row"
          }, [
            vue.createElementVNode("text", { class: "loading-text" }, "Đang tải thông tin từ CRM...")
          ])) : !$setup.form.customerCode ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-row"
          }, [
            vue.createElementVNode("text", null, "(Công việc này chưa gắn với khách hàng nào)")
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
                  vue.toDisplayString($setup.form.customerNameLabel),
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
                  vue.toDisplayString($setup.form.customerPhoneLabel),
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
                  vue.toDisplayString($setup.form.customerManagerLabel),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                { class: "item-right-text highlight-text" },
                vue.toDisplayString($setup.form.customerManagerName || "(Chưa có)"),
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
            vue.createElementVNode("text", { class: "section-title no-margin" }, "Bình luận và hoạt động"),
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
            onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
            }, ["stop"])),
            onChange: _cache[8] || (_cache[8] = (...args) => $setup.onCommentFilterChange && $setup.onCommentFilterChange(...args))
          }, [
            vue.createElementVNode(
              "view",
              { class: "filter-badge" },
              vue.toDisplayString($setup.commentFilterOptions[$setup.commentFilterIndex]) + " ▾ ",
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
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.newCommentText = $event),
                placeholder: $setup.isEditingComment ? "Đang chỉnh sửa..." : $setup.isReplying ? "Viết câu trả lời..." : "Viết bình luận"
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            $setup.isEditingComment ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "editing-alert"
            }, [
              vue.createElementVNode("text", { class: "editing-text" }, [
                vue.createTextVNode(" Đang chỉnh sửa bình luận của "),
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
                vue.createElementVNode("text", { class: "reply-label" }, "Đang trả lời bình luận của "),
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
                  nodes: $setup.replyingCommentData.message,
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
                label: $setup.isSubmittingComment ? "Đang lưu..." : "Lưu lại",
                onClick: $setup.submitComment
              }, null, 8, ["loading", "label", "onClick"])) : $setup.isEditingComment ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "edit-actions-row"
              }, [
                vue.createVNode($setup["AppButton"], {
                  type: "secondary",
                  size: "small",
                  label: "Hủy",
                  disabled: $setup.isSubmittingComment,
                  onClick: $setup.onCancelEditComment
                }, null, 8, ["disabled", "onClick"]),
                vue.createVNode($setup["AppButton"], {
                  type: "primary",
                  size: "small",
                  loading: $setup.isSubmittingComment,
                  label: $setup.isSubmittingComment ? "Đang cập nhật..." : "Cập nhật",
                  onClick: $setup.submitUpdateComment
                }, null, 8, ["loading", "label", "onClick"])
              ])) : $setup.isReplying ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "edit-actions-row"
              }, [
                vue.createVNode($setup["AppButton"], {
                  type: "secondary",
                  size: "small",
                  label: "Hủy",
                  disabled: $setup.isSubmittingComment,
                  onClick: $setup.onCancelReply
                }, null, 8, ["disabled", "onClick"]),
                vue.createVNode($setup["AppButton"], {
                  type: "primary",
                  size: "small",
                  loading: $setup.isSubmittingComment,
                  label: $setup.isSubmittingComment ? "Đang gửi..." : "Trả lời",
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
            vue.createElementVNode("text", null, "Đang tải bình luận...")
          ])) : $setup.comments.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-row"
          }, [
            vue.createElementVNode("text", null, "Chưa có bình luận nào.")
          ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.comments, (item) => {
                return vue.openBlock(), vue.createBlock($setup["CommentItem"], {
                  key: item.id,
                  data: item,
                  onReact: $setup.onToggleEmojiPicker,
                  onReply: _cache[10] || (_cache[10] = (data) => $setup.handleReply(data)),
                  onEdit: _cache[11] || (_cache[11] = (data) => $setup.handleEdit(data)),
                  onDelete: _cache[12] || (_cache[12] = (id) => $setup.onRequestDeleteComment(id))
                }, null, 8, ["data", "onReact"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]))
        ])) : vue.createCommentVNode("v-if", true),
        vue.createVNode($setup["ConfirmModal"], {
          visible: $setup.isConfirmCancelEditOpen,
          "onUpdate:visible": _cache[13] || (_cache[13] = ($event) => $setup.isConfirmCancelEditOpen = $event),
          title: "Xác nhận hủy",
          message: "Bạn có chắc muốn hủy chỉnh sửa? Các thay đổi sẽ không được lưu.",
          "cancel-label": "Tiếp tục sửa",
          "confirm-label": "Hủy bỏ",
          "confirm-type": "danger",
          onCancel: $setup.continueEditing,
          onConfirm: $setup.confirmCancelEdit
        }, null, 8, ["visible", "onCancel", "onConfirm"]),
        vue.createVNode($setup["ConfirmModal"], {
          visible: $setup.isConfirmCancelReplyOpen,
          "onUpdate:visible": _cache[14] || (_cache[14] = ($event) => $setup.isConfirmCancelReplyOpen = $event),
          title: "Hủy trả lời",
          message: "Bạn có chắc muốn hủy trả lời? Nội dung đã nhập sẽ bị mất.",
          "cancel-label": "Tiếp tục viết",
          "confirm-label": "Hủy bỏ",
          "confirm-type": "danger",
          onCancel: $setup.continueReplying,
          onConfirm: $setup.confirmCancelReply
        }, null, 8, ["visible", "onCancel", "onConfirm"]),
        vue.createElementVNode("view", { class: "section-header-row" }, [
          vue.createElementVNode("text", { class: "section-title no-margin" }, "Lịch sử tương tác"),
          vue.createElementVNode("picker", {
            mode: "selector",
            range: $setup.historyFilterOptions,
            value: $setup.historyFilterIndex,
            onChange: _cache[15] || (_cache[15] = (...args) => $setup.onHistoryFilterChange && $setup.onHistoryFilterChange(...args))
          }, [
            vue.createElementVNode(
              "view",
              { class: "filter-badge" },
              vue.toDisplayString($setup.historyFilterOptions[$setup.historyFilterIndex]) + " ▾ ",
              1
              /* TEXT */
            )
          ], 40, ["range", "value"])
        ]),
        vue.createElementVNode("view", { class: "history-container" }, [
          $setup.isLoadingHistory ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-row"
          }, [
            vue.createElementVNode("text", { class: "loading-text" }, "Đang tải lịch sử...")
          ])) : $setup.historyList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "empty-row"
          }, [
            vue.createElementVNode("text", null, "(Không tìm thấy dữ liệu)")
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
        ]),
        vue.createElementVNode("view", { style: { "height": "50px" } })
      ], 8, ["scroll-into-view"]),
      vue.createVNode($setup["ConfirmModal"], {
        visible: $setup.isConfirmDeleteCommentOpen,
        "onUpdate:visible": _cache[16] || (_cache[16] = ($event) => $setup.isConfirmDeleteCommentOpen = $event),
        title: "Xác nhận xóa",
        message: "Bạn có chắc muốn xóa bình luận này không?",
        "confirm-type": "danger",
        onConfirm: $setup.confirmDeleteComment,
        onCancel: $setup.cancelDeleteComment
      }, null, 8, ["visible", "onConfirm", "onCancel"]),
      $setup.isEmojiPickerOpen ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "modal-overlay",
        onClick: _cache[18] || (_cache[18] = (...args) => $setup.closeEmojiPicker && $setup.closeEmojiPicker(...args))
      }, [
        vue.createElementVNode("view", {
          class: "emoji-picker-container",
          onClick: _cache[17] || (_cache[17] = vue.withModifiers(() => {
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
  const PagesTodoTodoDetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-9f96c8fe"], ["__file", "D:/uni_app/vbot-todo-android/pages/todo/todo_detail.vue"]]);
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
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/uni_app/vbot-todo-android/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
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
