
# Hidden Admin Portal Testing Protocol

This document outlines the testing procedures for verifying that the admin portal remains invisible to unauthorized users while being fully functional for authorized administrators.

## 1. Unauthorized Access Testing

### 1.1 Basic Access Attempt
- **Test:** Navigate to `/inventory-archive` as an unauthenticated user
- **Expected:** Standard 404 page appears
- **Purpose:** Verify the portal appears as a normal 404 page

### 1.2 Non-Whitelisted IP Testing
- **Test:** Attempt to access `/inventory-archive` from a non-whitelisted IP
- **Expected:** Standard 404 page appears
- **Purpose:** Verify IP whitelisting functionality

### 1.3 Brute Force Protection
- **Test:** Attempt login with incorrect credentials more than 3 times
- **Expected:** After 3 attempts, system should only show 404 page regardless of correct credentials
- **Purpose:** Verify rate limiting functionality

### 1.4 Code Inspection Testing
- **Test:** Inspect page source code and network requests
- **Expected:** No references to "admin" or administrative terminology in source code
- **Purpose:** Verify code obfuscation effectiveness

## 2. Authorized Access Testing

### 2.1 Valid Credentials
- **Test:** Access portal with valid username/password from whitelisted IP
- **Expected:** TOTP verification screen appears
- **Purpose:** Verify basic authentication works

### 2.2 TOTP Verification
- **Test:** Enter valid TOTP code after password verification
- **Expected:** Admin interface appears
- **Purpose:** Verify 2FA functionality

### 2.3 Session Management
- **Test:** Remain inactive for more than 15 minutes
- **Expected:** Automatic logout occurs
- **Purpose:** Verify session timeout functionality

### 2.4 Activity-Based Session Extension
- **Test:** Interact with page periodically over 20 minutes
- **Expected:** Session remains active
- **Purpose:** Verify activity-based session management

## 3. Security Alert Testing

### 3.1 Failed Login Alerts
- **Test:** Trigger multiple failed login attempts
- **Expected:** Slack alert is sent (check Slack channel or logs)
- **Purpose:** Verify alert system functionality

### 3.2 Non-Whitelisted IP Alert
- **Test:** Attempt access from non-whitelisted IP
- **Expected:** Slack alert is sent with IP information
- **Purpose:** Verify IP-based alert functionality

## 4. Edge Case Testing

### 4.1 JWT Token Validation
- **Test:** Modify local JWT token and attempt to access protected resources
- **Expected:** Access denied, returned to login screen
- **Purpose:** Verify token validation security

### 4.2 Direct API Access
- **Test:** Attempt to directly access any API endpoints used by admin portal
- **Expected:** 404 or authorization error
- **Purpose:** Verify API endpoints are properly secured

## Implementation Notes for Security Testing

For testing in development:
1. Use different browsers or incognito windows to simulate different users
2. Use VPN to test non-whitelisted IP scenarios
3. Check browser console for any security logs
4. Monitor the mock Slack alerts in the browser console

For production testing:
1. Use actual different IP addresses
2. Set up a real Google Authenticator for TOTP testing
3. Monitor actual Slack channel for alerts
4. Use a security scanner to attempt to discover the admin route
