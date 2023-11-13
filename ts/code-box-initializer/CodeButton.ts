import CodeBoxCode from "./CodeBoxCode";
import EventSourcePoint from "./EventSourcePoint";

abstract class CodeButton {
    protected onClickEventSource : EventSourcePoint<CodeButton> | null;
    public readonly codeBoxCode : CodeBoxCode;

    constructor(codeBoxCode: CodeBoxCode) {
        this.onClickEventSource = null;
        this.codeBoxCode = codeBoxCode;
    }

    public setOnClickEventSource(eventSource: EventSourcePoint<CodeButton>) : void {
        this.onClickEventSource = eventSource;
    }

    public removeOnClickEventSource() : void {
        this.onClickEventSource = null;
    }

    public abstract activate() : void;
    public abstract deactivate() : void;
}

export default CodeButton;