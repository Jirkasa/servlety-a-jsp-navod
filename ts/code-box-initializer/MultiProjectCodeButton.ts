import CodeBoxCode from "./CodeBoxCode";
import CodeButton from "./CodeButton";
import EventSourcePoint from "./EventSourcePoint";
import ProjectCodeButton from "./ProjectCodeButton";

/**
 * Represents code button composed of multiple project code buttons that act as one.
 */
class MultiProjectCodeButton extends CodeButton {
    /** Event source used for subscribing to clicks of multiple code buttons. */
    private onCodeButtonClickEventSource: EventSourcePoint<CodeButton>;
    /** Code buttons. */
    private codeButtons: ProjectCodeButton[];

    /**
     * Creates code button composed of multiple project code buttons.
     * @param buttonText Text of buttons.
     * @param containers Array of containers into which should be added created buttons (Number of containers determines number of buttons).
     * @param codeBoxCode Code box code with which should be code button associated.
     */
    constructor(buttonText: string, containers: HTMLElement[], codeBoxCode: CodeBoxCode) {
        super(codeBoxCode);

        this.onCodeButtonClickEventSource = new EventSourcePoint();
        this.codeButtons = [];

        // create code buttons
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

    /**
     * Called when one of code buttons is clicked.
     */
    private onCodeButtonClick() {
        if (this.onClickEventSource) {
            this.onClickEventSource.fire(this);
        }
    }
}

export default MultiProjectCodeButton;