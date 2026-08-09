import { Plugin, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_ZINCCHIRP } from "./util";
import { ZincchirpView } from "./view";

export default class Zincchirp extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE_ZINCCHIRP, (leaf) => new ZincchirpView(leaf));

    this.addCommand({
      id: "open-zincchirp-view",
      name: "Open Zincchirp panel",
      callback: () => {
        this.activateView();
      },
    });
  }

  onunload() {}

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
