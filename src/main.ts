import { Plugin, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_ZINCCHIRP } from "./util";
import { ZincchirpView } from "./view";
import { ZincchirpModel } from "./model";
import {
  ZincchirpSettings,
  DEFAULT_SETTINGS,
  ZincchirpSettingTab,
} from "./settings";

export default class Zincchirp extends Plugin {
  settings!: ZincchirpSettings;

  async onload() {
    await this.loadSettings();

    const model = new ZincchirpModel(this.app, this);
    this.registerView(
      VIEW_TYPE_ZINCCHIRP,
      (leaf) => new ZincchirpView(leaf, model),
    );

    this.addSettingTab(new ZincchirpSettingTab(this.app, this));

    this.addCommand({
      id: "open-zincchirp-view",
      name: "Open Zincchirp panel",
      callback: () => {
        this.activateView();
      },
    });
  }

  onunload() {}

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      (await this.loadData()) as Partial<ZincchirpSettings>,
    );
  }

  async activateView() {
    const { workspace } = this.app;

    const leaf = await this.getOrCreateLeaf();
    workspace.revealLeaf(leaf);
  }

  async getOrCreateLeaf(): Promise<WorkspaceLeaf> {
    const { workspace } = this.app;

    const existing = workspace.getLeavesOfType(VIEW_TYPE_ZINCCHIRP)[0];
    if (existing != null) {
      return existing;
    }

    let leaf = workspace.getRightLeaf(false);
    if (!leaf) {
      throw new Error("Could not create a leaf in the right sidebar");
    }
    await leaf.setViewState({ type: VIEW_TYPE_ZINCCHIRP, active: true });
    return leaf;
  }
}
