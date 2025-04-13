## Notes & Considerations

### Assumptions
- The application assumes basic authentication is handled outside this feature scope.
- Default pagination and validation rules follow Laravel's standard behavior.

### Edge Cases
- No special handling for extremely large datasets or nested resources.
- Error responses assume a typical JSON API client; no custom formatting yet.

### Improvements With More Time
- Refactor API logic using `ApiResource` and `ResourceCollection` for cleaner and more standardized API responses.
- Use https://ui.shadcn.com/ built in to laravel 12 for ui.
- Implement automated testing (e.g., Feature and Unit tests) for improved reliability.
