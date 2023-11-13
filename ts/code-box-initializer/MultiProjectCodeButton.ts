import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import EventSourcePoint from "./EventSourcePoint";
import ProjectCodeButton from "./ProjectCodeButton";

class MultiProjectCodeButton extends CodeButton {
    private onCodeButtonClickEventSource: EventSourcePoint<CodeButton>;
    private codeButtons: ProjectCodeButton[];

    constructor(buttonText: string, containers: HTMLElement[], codeBoxCode: CodeBoxCode) {
        super(codeBoxCode);

        this.onCodeButtonClickEventSource = new EventSourcePoint();
        this.codeButtons = [];

        for (let container of containers) {
            const codeButton = new ProjectCodeButton(buttonText, container, codeBoxCode);
            codeButton.setOnClickEventSource(this.onCodeButtonClickEventSource);
            this.codeButtons.push(codeButton);
        }

        this.onCodeButtonClickEventSource.subscribe(() => this.onCodeButtonClick());
    }

    public activate(): void {
        for (let codeButton of this.codeButtons) {
            codeButton.activate();
        }
    }

    public deactivate(): void {
        for (let codeButton of this.codeButtons) {
            codeButton.deactivate();
        }
    }

    private onCodeButtonClick() {
        if (this.onClickEventSource) {
            this.onClickEventSource.fire(this);
        }
    }
}

export default MultiProjectCodeButton;