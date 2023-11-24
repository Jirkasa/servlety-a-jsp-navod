import CodeBoxCode from "./CodeBoxCode";
import EventSourcePoint from "./EventSourcePoint";

/**
 * Base class for code button.
 */
abstract class CodeButton {
    /** Event source for which is fired event when code button is clicked. */
    protected onClickEventSource : EventSourcePoint<CodeButton> | null;
    /** Code box code with which is code button associated. */
    public readonly codeBoxCode : CodeBoxCode;

    /**
     * @param codeBoxCode Code box code with which should be code button associated.
     */
    constructor(codeBoxCode: CodeBoxCode) {
        this.onClickEventSource = null;
        this.codeBoxCode = codeBoxCode;
    }

    /**
     * Sets event source for which should be fired event when button is clicked.
     * @param eventSource Event source to be set.
     */
    public setOnClickEventSource(eventSource: EventSourcePoint<CodeButton>) : void {
        this.onClickEventSource = eventSource;
    }

    /**
     * Removes event source for clicks of button.
     */
    public removeOnClickEventSource() : void {
        this.onClickEventSource = null;
    }

    /** Sets button to active state. */
    public abstract activate() : void;
    /** Sets button to normal state. */
    public abstract deactivate() : void;
}

export default CodeButton;