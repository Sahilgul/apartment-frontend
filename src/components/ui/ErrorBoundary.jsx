import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    const { fallback, children } = this.props;
    
    if (this.state.hasError) {
      // If a custom fallback was provided, use it
      if (fallback) {
        return fallback(this.state.error);
      }
      
      // Otherwise use default error UI
      return (
        <div className="p-6 mx-auto my-8 max-w-2xl bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 mb-4">
            An error occurred while rendering this component. Please try refreshing the page or contact support if the problem persists.
          </p>
          <details className="bg-white p-4 rounded-md mb-4">
            <summary className="font-medium text-gray-800 cursor-pointer">
              Error details
            </summary>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-red-800 overflow-auto p-2 bg-red-50 rounded">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;