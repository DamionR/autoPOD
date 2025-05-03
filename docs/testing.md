# Testing Guide

This document describes the testing strategy for autoPOD. All business logic and critical user flows must be covered by tests.

## Coverage Requirements
- 100% test coverage required for all business logic and critical user flows
- All new features must include tests before merging
- PRs without tests will not be accepted

## Tools
- **Frontend**: Jest + React Testing Library
- **Edge Functions**: Deno test (TypeScript)
- **Supabase**: Use test databases and migrations for integration tests

## Running Tests Locally

### Frontend
```sh
cd frontend
npm test
```

### Edge Functions
```sh
cd supabase/functions/<function-name>
deno test
```

### Full Integration Tests
- Use a test Supabase project or local stack
- Run all migrations before testing
- Use test data and clean up after tests

## Continuous Integration (CI)
- All tests must pass in CI before merging
- Coverage reports are generated and reviewed for each PR

## Troubleshooting
- For common test failures, see `troubleshooting.md`
- For CI issues, see logs and ensure all environment variables are set

## References
- [Contribution Guidelines](contribution.md)
- [Troubleshooting](troubleshooting.md) 