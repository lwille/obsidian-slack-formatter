import {
  App,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting
} from "obsidian";

interface SlackFormatterSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: SlackFormatterSettings = {
  mySetting: "default"
};

export default class SlackFormatter extends Plugin {
  settings: SlackFormatterSettings;

  async onload() {
    console.log("loading Slack Formatter plugin");

    this.addRibbonIcon("dice", "Format and copy for Slack", () => {
      const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

      if (activeView) {
        const text = activeView.editor.somethingSelected()
          ? activeView.editor.getSelection()
          : activeView.editor.getValue();
        const formatted = [
          // TODO: make replacements configurable
          [/^## (.*)$/gm, "* $1 *"],
          [/\[\[(.*)\]\]/gm, "$1"]
        ].reduce((s, args) => s.replace.apply(s, args), text);
        navigator.clipboard.writeText(formatted);
        new Notice("Formatted and copied current file!");
      }
    });
  }
}
