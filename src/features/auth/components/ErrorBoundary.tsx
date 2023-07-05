import { PIXEL_SCALE } from "features/game/lib/constants";
import React, { Component, ReactNode } from "react";
import ocean from "assets/decorations/ocean.webp";
import { BoundaryError } from "./SomethingWentWrong";
import { Modal } from "react-bootstrap";
import { Panel } from "components/ui/Panel";
import { createErrorLogger } from "lib/errorLogger";

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  private static errorLogger = createErrorLogger("react_error_modal", 0);

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    this.errorLogger(error);
    return { error };
  }

  public render() {
    if (this.state.error !== null) {
      return (
        <>
          <div
            className="absolute inset-0 bg-repeat w-full h-full"
            style={{
              backgroundImage: `url(${ocean})`,
              backgroundSize: `${64 * PIXEL_SCALE}px`,
              imageRendering: "pixelated",
            }}
          />
          <Modal show={true} centered>
            <Panel>
              <BoundaryError
                error={this.state.error.message}
                stack={this.state.error.stack}
              />
            </Panel>
          </Modal>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
