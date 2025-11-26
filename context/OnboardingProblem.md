# Onboarding Problem: Low customer activation rate. Customers aren't starting using the DVIR product

## 1. Product Context

* **Product:** A SaaS tool for conducting and managing Driver Vehicle Inspection Reports (DVIRs).
* **Primary Users:**
  * **Fleet Managers:** Use the "Reveal Web" interface to set up inspection forms and review submitted reports.
  * **Drivers:** Use the "Reveal Driver Plus" mobile app to submit vehicle and trailer inspections.

## 2. The Core Problem

**Over 60% of paying customers never fully activate their accounts.** They subscribe to the service, but their drivers never submit a single inspection, leading to high churn before the product is ever truly used.

## 3. Root Cause Analysis

The primary reason for this churn is a **long and difficult setup process**.

* **Time to Value:** It takes a fleet manager an average of **30 days** to complete the setup.
* **Customer Feedback:**
  * **"I didn't have the time."**: Fleet managers are too busy with daily operations to navigate a complex setup.
  * **"I didn't receive the onboarding information."**: Users get lost and don't know how to train their drivers.
  * **"I had issues with the setup..."**: The tool itself is confusing, especially around user permissions and vehicle groups.

## 4. Current (Problematic) Onboarding Workflow

The current process is entirely manual and places a heavy burden on the fleet manager:

1. **Create & Publish Inspection Form:**
    * Navigate to `Maintenance > Forms`.
    * Build a form from scratch or use a template.
    * Publish the form via a 3-dot menu to make it visible to drivers.
    * **Data Insights (out of 722 accounts haven't published DVIR forms over 1 year):**
        * 54% actively use Livemap monthly but only 25% visit DVIR homepage in the last 30 days (low awareness/or interest).
        * Livemap is Reveal's homepage after login. Not using livemap it means they didn't even use Reveal which is the mother app of our DVIR system.
        * >60% of the users that haven't published a template yet and are opening DVIR homepage are not interested in DVIR (they go on other parts of the product or leave the page immediately).
        * Only half of the users that open the DVIR page and didn't publish are having an admin profile (the rest can't do the setup).

2. **Test & Iterate Form:**
    * Managers must figure out how to test the form on their own mobile devices, as there is no preview of the driver's experience in the web app.

3. **Configure Drivers:**
    * Go to the `Admin` page.
    * Manually verify or enter information for every driver.
    * Ensure each driver has a correct email, mobile access enabled, and is assigned to the correct vehicle "groups" to see the right vehicles in their app.

4. **Train Drivers:**
    * The manager must create training materials and instructions.
    * Training is typically done in person, supplemented by emails, requiring significant coordination.

5. **Review & Adjust:**
    * Continuously monitor submitted inspections and tweak the form templates as needed.

*An account is only considered "fully activated" when drivers begin submitting inspections.*

## 5. The Goal

**Transform the 30-day manual setup into a streamlined, AI-assisted process that a manager can complete in a single day.**
