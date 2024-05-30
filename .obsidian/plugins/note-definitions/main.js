/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => NoteDefinition
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/core/def-file-manager.ts
var import_obsidian = require("obsidian");

// src/util/editor.ts
function getWordUnderCursor(editor) {
  const curWordRange = editor.wordAt(editor.getCursor());
  if (!curWordRange)
    return;
  let currWord = editor.getRange(curWordRange.from, curWordRange.to);
  if (!currWord) {
    return "";
  }
  return normaliseWord(currWord);
}
function normaliseWord(word) {
  return word.trimStart().trimEnd().toLowerCase();
}

// src/util/log.ts
var levelMap = {
  0: "SILENT",
  // Should not be used
  1: "ERROR",
  2: "WARN",
  3: "INFO",
  4: "DEBUG"
};
function logWithLevel(msg, logLevel) {
  if (window.NoteDefinition.LOG_LEVEL >= logLevel) {
    console.log(`${levelMap[logLevel]}: ${msg}`);
  }
}
function logDebug(msg) {
  logWithLevel(msg, 4 /* Debug */);
}
function logWarn(msg) {
  logWithLevel(msg, 2 /* Warn */);
}
function logError(msg) {
  logWithLevel(msg, 1 /* Error */);
}

// src/core/file-parser.ts
var FileParser = class {
  constructor(app, file) {
    this.app = app;
    this.vault = app.vault;
    this.file = file;
    this.defBuffer = {};
    this.inDefinition = false;
    this.definitions = [];
  }
  async parseFile() {
    const fileContent = await this.vault.cachedRead(this.file);
    const lines = fileContent.split("\n");
    for (const line of lines) {
      if (line == "") {
        continue;
      }
      if (this.isEndOfBlock(line)) {
        if (this.bufferValid()) {
          this.commitDefBuffer();
        }
        this.startNewBlock();
        continue;
      }
      if (this.inDefinition) {
        this.defBuffer.definition += line + "\n";
        continue;
      }
      if (this.isWordDeclaration(line)) {
        this.defBuffer.word = this.extractWordDeclaration(line);
        continue;
      }
      if (this.isFullNameDeclaration(line)) {
        this.defBuffer.fullName = this.extractFullName(line);
        continue;
      }
      this.inDefinition = true;
      this.defBuffer.definition = line + "\n";
    }
    if (this.bufferValid()) {
      this.commitDefBuffer();
    }
    return this.definitions;
  }
  commitDefBuffer() {
    var _a, _b, _c, _d, _e;
    this.definitions.push({
      key: (_b = (_a = this.defBuffer.word) == null ? void 0 : _a.toLowerCase()) != null ? _b : "",
      word: (_c = this.defBuffer.word) != null ? _c : "",
      fullName: (_d = this.defBuffer.fullName) != null ? _d : "",
      definition: (_e = this.defBuffer.definition) != null ? _e : "",
      file: this.file,
      linkText: `${this.file.path}${this.defBuffer.word ? "#" + this.defBuffer.word : ""}`
    });
    this.defBuffer = {};
  }
  bufferValid() {
    return !!this.defBuffer.word;
  }
  isEndOfBlock(line) {
    return line.startsWith("---");
  }
  isFullNameDeclaration(line) {
    line = line.trimEnd();
    return !!this.defBuffer.word && line.startsWith("*") && line.endsWith("*");
  }
  extractFullName(line) {
    line = line.trimEnd();
    return line.slice(1, line.length - 1);
  }
  // This assumes that no other line in the definition block can make use of the '#' heading syntax
  isWordDeclaration(line) {
    return line.startsWith("#");
  }
  extractWordDeclaration(line) {
    const sepLine = line.split(" ");
    if (sepLine.length <= 1) {
      return "";
    }
    return sepLine.slice(1).join(" ");
  }
  startNewBlock() {
    this.inDefinition = false;
    this.defBuffer = {};
  }
};

// src/core/def-file-manager.ts
var DEFAULT_DEF_FOLDER = "definitions";
var defFileManager;
var DefManager = class {
  constructor(app) {
    this.app = app;
    this.globalDefs = /* @__PURE__ */ new Map();
    this.globalDefFiles = [];
    window.NoteDefinition.definitions.global = this.globalDefs;
  }
  isDefFile(file) {
    return file.path.startsWith(this.getGlobalDefFolder());
  }
  reset() {
    this.globalDefs.clear();
    this.globalDefFiles = [];
  }
  loadDefinitions() {
    this.reset();
    this.loadGlobals();
  }
  get(key) {
    return this.globalDefs.get(normaliseWord(key));
  }
  has(key) {
    return this.globalDefs.has(normaliseWord(key));
  }
  async loadGlobals() {
    const globalFolder = this.app.vault.getFolderByPath(this.getGlobalDefFolder());
    if (!globalFolder) {
      logWarn("Global definition folder not found, unable to load global definitions");
      return;
    }
    const definitions = await this.parseFolder(globalFolder);
    definitions.forEach((def) => {
      this.globalDefs.set(def.key, def);
    });
  }
  async parseFolder(folder) {
    const definitions = [];
    for (let f of folder.children) {
      if (f instanceof import_obsidian.TFolder) {
        let defs = await this.parseFolder(f);
        definitions.push(...defs);
      } else if (f instanceof import_obsidian.TFile) {
        let defs = await this.parseFile(f);
        definitions.push(...defs);
      }
    }
    return definitions;
  }
  async parseFile(file) {
    this.globalDefFiles.push(file);
    let parser = new FileParser(this.app, file);
    return parser.parseFile();
  }
  // Here for extensibility
  getGlobalDefFolder() {
    return DEFAULT_DEF_FOLDER;
  }
};
function initDefFileManager(app) {
  defFileManager = new DefManager(app);
  return defFileManager;
}
function getDefFileManager() {
  return defFileManager;
}

// src/editor/definition-dropdown.ts
var import_obsidian2 = require("obsidian");
var DEF_DROPDOWN_ID = "definition-dropdown";
var definitionDropdown;
var DefinitionDropdown = class {
  constructor(plugin) {
    this.close = () => {
      this.unmount();
    };
    this.clickClose = () => {
      var _a;
      if ((_a = this.mountedDropdown) == null ? void 0 : _a.matches(":hover")) {
        return;
      }
      this.close();
    };
    this.app = plugin.app;
    this.plugin = plugin;
    this.cmEditor = this.getCmEditor(this.app);
  }
  // Open at editor cursor's position
  openAtCursor(def) {
    this.unmount();
    this.mountAtCursor(def);
    if (!this.mountedDropdown) {
      logError("Mounting definition dropdown failed");
      return;
    }
    this.registerCloseDropdownListeners();
  }
  // Open at coordinates (can use for opening at mouse position)
  openAtCoords(def, coords) {
    this.unmount();
    this.mountAtCoordinates(def, coords);
    if (!this.mountedDropdown) {
      logError("mounting definition dropdown failed");
      return;
    }
    this.registerCloseDropdownListeners();
  }
  cleanUp() {
    logDebug("Cleaning dropdown elements");
    const dropdownEls = document.getElementsByClassName(DEF_DROPDOWN_ID);
    for (let i = 0; i < dropdownEls.length; i++) {
      dropdownEls[i].remove();
    }
  }
  getCmEditor(app) {
    var _a, _b, _c;
    const activeView = app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    const cmEditor = (_c = (_b = (_a = activeView == null ? void 0 : activeView.editMode) == null ? void 0 : _a.editor) == null ? void 0 : _b.cm) == null ? void 0 : _c.cm;
    if (!cmEditor) {
      logDebug("cmEditor object not found, will not handle vim events for definition dropdown");
    }
    return cmEditor;
  }
  // True if open towards right, otherwise left
  shouldOpenToRight(horizontalOffset, containerStyle) {
    return horizontalOffset > parseInt(containerStyle.width) / 2;
  }
  shouldOpenUpwards(verticalOffset, containerStyle) {
    return verticalOffset > parseInt(containerStyle.height) / 2;
  }
  createElement(def) {
    const el = this.app.workspace.containerEl.createEl("div", {
      cls: "definition-dropdown",
      attr: {
        id: DEF_DROPDOWN_ID,
        style: `visibility:hidden`
      }
    });
    el.createEl("h2", { text: def.word });
    if (def.fullName != "") {
      el.createEl("i", { text: def.fullName });
    }
    el.createEl("p", {
      text: def.definition,
      attr: {
        style: "white-space: pre-line"
      }
    });
    return el;
  }
  mountAtCursor(def) {
    let cursorCoords;
    try {
      cursorCoords = this.getCursorCoords();
    } catch (e) {
      logError("Could not open definition dropdown - could not get cursor coordinates");
      return;
    }
    this.mountAtCoordinates(def, cursorCoords);
  }
  mountAtCoordinates(def, coords) {
    const workspaceStyle = getComputedStyle(this.app.workspace.containerEl);
    this.mountedDropdown = this.createElement(def);
    const positionStyle = {
      visibility: "visible",
      maxWidth: "500px"
    };
    if (this.shouldOpenToRight(coords.left, workspaceStyle)) {
      positionStyle.right = `${parseInt(workspaceStyle.width) - coords.left}px`;
    } else {
      positionStyle.left = `${coords.left}px`;
    }
    if (this.shouldOpenUpwards(coords.top, workspaceStyle)) {
      positionStyle.bottom = `${parseInt(workspaceStyle.height) - coords.top}px`;
    } else {
      positionStyle.top = `${coords.bottom}px`;
    }
    this.mountedDropdown.setCssStyles(positionStyle);
  }
  unmount() {
    if (!this.mountedDropdown) {
      logDebug("Nothing to unmount, could not find dropdown element");
      return;
    }
    this.mountedDropdown.remove();
    this.mountedDropdown = void 0;
    this.unregisterCloseDropdownListeners();
  }
  getCursorCoords() {
    var _a, _b;
    const editor = (_a = this.app.workspace.activeEditor) == null ? void 0 : _a.editor;
    return (_b = editor == null ? void 0 : editor.cm) == null ? void 0 : _b.coordsAtPos(editor == null ? void 0 : editor.posToOffset(editor == null ? void 0 : editor.getCursor()), -1);
  }
  registerCloseDropdownListeners() {
    this.app.workspace.containerEl.addEventListener("keypress", this.close);
    this.app.workspace.containerEl.addEventListener("click", this.clickClose);
    if (this.cmEditor) {
      this.cmEditor.on("vim-keypress", this.close);
    }
    const scroller = this.getCmScroller();
    if (scroller) {
      scroller.addEventListener("scroll", this.close);
    }
  }
  unregisterCloseDropdownListeners() {
    this.app.workspace.containerEl.removeEventListener("keypress", this.close);
    this.app.workspace.containerEl.removeEventListener("click", this.clickClose);
    if (this.cmEditor) {
      this.cmEditor.off("vim-keypress", this.close);
    }
    const scroller = this.getCmScroller();
    if (scroller) {
      scroller.removeEventListener("scroll", this.close);
    }
  }
  getCmScroller() {
    const scroller = document.getElementsByClassName("cm-scroller");
    if (scroller.length > 0) {
      return scroller[0];
    }
  }
  getDropdownElement() {
    return document.getElementById("definition-dropdown");
  }
};
function initDefinitionDropdown(plugin) {
  if (definitionDropdown) {
    definitionDropdown.cleanUp();
  }
  definitionDropdown = new DefinitionDropdown(plugin);
}
function getDefinitionDropdown() {
  return definitionDropdown;
}

// src/globals.ts
function injectGlobals() {
  var _a;
  window.NoteDefinition = {
    LOG_LEVEL: ((_a = window.NoteDefinition) == null ? void 0 : _a.LOG_LEVEL) || 1 /* Error */,
    definitions: {
      global: /* @__PURE__ */ new Map()
    },
    triggerDefPreview: (el) => {
      const word = el.getAttr("def");
      if (!word)
        return;
      const def = getDefFileManager().get(word);
      if (!def)
        return;
      const defDropdown = getDefinitionDropdown();
      let isOpen = false;
      const openDropdown = setTimeout(() => {
        defDropdown.openAtCoords(def, el.getBoundingClientRect());
      }, 200);
      el.onmouseleave = () => {
        if (!isOpen) {
          clearTimeout(openDropdown);
        }
      };
    }
  };
}

// src/editor/underline.ts
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var DefinitionMarker = class {
  constructor(view) {
    this.alphabetRegex = /^[a-zA-Z]+$/;
    // terminating chars mark the end of a word
    this.terminatingCharRegex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\\r\n ]/;
    this.decorations = this.buildDecorations(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
      return;
    }
  }
  destroy() {
  }
  buildDecorations(view) {
    logDebug("Rebuild definition underline decorations");
    const builder = new import_state.RangeSetBuilder();
    const wordPositions = [];
    for (let { from, to } of view.visibleRanges) {
      const text = view.state.sliceDoc(from, to);
      wordPositions.push(...this.scanText(text, from));
    }
    wordPositions.forEach((wordPos) => {
      builder.add(wordPos.from, wordPos.to, import_view.Decoration.mark({
        class: "def-decoration",
        attributes: {
          onmouseenter: `window.NoteDefinition.triggerDefPreview(this)`,
          def: wordPos.word
        }
      }));
    });
    return builder.finish();
  }
  // Scan text and return words and their positions that require decoration
  scanText(text, offset) {
    const defManager = getDefFileManager();
    let wordPositions = [];
    let wordBuf = [];
    let word = "";
    for (let i = 0; i < text.length; i++) {
      let c = text.charAt(i);
      if (wordBuf.length == 0 && this.alphabetRegex.test(c)) {
        wordBuf.push(c);
        continue;
      }
      if (wordBuf.length > 0 && this.terminatingCharRegex.test(c)) {
        word = wordBuf.join("");
        if (defManager.has(word.toLowerCase())) {
          wordPositions.push({
            from: offset + i - word.length,
            to: offset + i,
            word
          });
        }
        wordBuf = [];
        word = "";
        continue;
      }
      if (wordBuf.length > 0) {
        wordBuf.push(c);
      }
    }
    return wordPositions;
  }
};
var pluginSpec = {
  decorations: (value) => value.decorations
};
var definitionMarker = import_view.ViewPlugin.fromClass(
  DefinitionMarker,
  pluginSpec
);

// src/main.ts
var NoteDefinition = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.activeEditorExtensions = [];
  }
  async onload() {
    injectGlobals();
    logDebug("Load note definition plugin");
    this.defManager = initDefFileManager(this.app);
    this.registerCommands();
    this.registerEvents();
    this.registerEditorExtension(this.activeEditorExtensions);
  }
  registerCommands() {
    this.addCommand({
      id: "preview-definition",
      name: "Preview definition",
      editorCallback: (editor) => {
        const curWord = getWordUnderCursor(editor);
        if (!curWord)
          return;
        const def = window.NoteDefinition.definitions.global.get(curWord);
        if (!def)
          return;
        getDefinitionDropdown().openAtCursor(def);
      }
    });
    this.addCommand({
      id: "goto-definition",
      name: "Go to definition",
      editorCallback: (editor) => {
        const currWord = getWordUnderCursor(editor);
        if (!currWord)
          return;
        const def = this.defManager.get(currWord);
        if (!def)
          return;
        this.app.workspace.openLinkText(def.linkText, "");
      }
    });
  }
  registerEvents() {
    this.registerEvent(this.app.workspace.on("active-leaf-change", async (leaf) => {
      if (!leaf)
        return;
      const currFile = this.app.workspace.getActiveFile();
      if (currFile && this.defManager.isDefFile(currFile)) {
        this.setActiveEditorExtensions([]);
      } else {
        this.setActiveEditorExtensions(definitionMarker);
      }
      initDefinitionDropdown(this);
      this.defManager.loadDefinitions();
    }));
    this.registerEvent(this.app.workspace.on("editor-menu", (menu, editor) => {
      const curWord = getWordUnderCursor(editor);
      if (!curWord)
        return;
      const def = this.defManager.get(curWord);
      if (!def)
        return;
      this.registerMenuItems(menu, def);
    }));
  }
  registerMenuItems(menu, def) {
    menu.addItem((item) => {
      item.setTitle("Preview definition").setIcon("book-open-text").onClick(() => {
        getDefinitionDropdown().openAtCursor(def);
      });
    });
    menu.addItem((item) => {
      item.setTitle("Go to definition").setIcon("arrow-left-from-line").onClick(() => {
        this.app.workspace.openLinkText(def.linkText, "");
      });
    });
  }
  setActiveEditorExtensions(...ext) {
    this.activeEditorExtensions.length = 0;
    this.activeEditorExtensions.push(...ext);
    this.app.workspace.updateOptions();
  }
  onunload() {
    logDebug("Unload note definition plugin");
    getDefinitionDropdown().cleanUp();
  }
};