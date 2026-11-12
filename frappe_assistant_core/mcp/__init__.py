"""
thinkNXG Assistant Core - Custom MCP Server Implementation

A streamlined MCP (Model Context Protocol) server implementation
specifically designed for thinkNXG Framework.

Based on the MCP specification with fixes for proper JSON serialization
and thinkNXG-specific optimizations.
"""

from frappe_assistant_core.mcp.server import MCPServer

__all__ = ["MCPServer"]
