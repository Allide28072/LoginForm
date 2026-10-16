import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Unexpected error in LoginForm", error, info);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary" role="alert">
          <span className="section-label">SOMETHING WENT WRONG</span>
          <h1>An unexpected error occurred.</h1>
          <p>
            The page could not be displayed. Try again, or use the
            navigation to open a different page.
          </p>
          {this.state.error && (
            <details className="error-details">
              <summary>Error details</summary>
              <pre>{this.state.error.message}</pre>
            </details>
          )}
          <button
            type="button"
            className="button button-primary"
            onClick={this.handleReset}
          >
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
