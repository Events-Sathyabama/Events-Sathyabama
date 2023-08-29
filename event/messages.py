class Message:
    class event_creat:
        event_created = "Event Created Successfully"

    class detail:
        not_found = 'No Event Found!!!'

    class event_update:
        event_is_completed = 'Event cannot be updated at this point of time'
        fields_not_changed_after_approved = "'{0}' Fields cannot be changed after approval"

    class applicaition_approval:
        success = 'Application Updated!!'

    class event_approval:
        forbidden = 'Operation Not Allowed!!'
        already_approved = 'Event is already Approved'
        not_found = 'No Event Found'

        hod_verified = 'Verified By HOD'
        verify_hod_first = 'This event need to be verified by HOD first'

        dean_verified = 'Verified By Dean'
        verify_dean_first = 'This event need to be verified by Dean first'

        vc_verified = 'Verified by VC'

        approval_process_done = 'Displayed to Student'

        server_error = 'Something Went Wrong!!'

        success = 'Approved Successfully'

    class event_deny:
        forbidden = 'Operation Not Allowed!!'
        not_found = 'No Event Found'

        hod_declined = 'Declined By HOD'
        dean_declined = 'Declined By Dean'
        vc_declined = 'Declined by VC'

        server_error = 'Something Went Wrong'
        success = 'Declined Successfully'
        event_already_approved = 'Event is Already Approved'
        event_already_denied = 'Event is Already Rejected'

    class report_upload:
        success = 'Report Uploaded!!'
        error = 'Please Send a valid File!'
        ongoing_event = 'You can Only Upload Report once the event is completed'
        report_approved = 'Report is already Approved you cannot change it'

        # inside Timeline Report submitted by 'first_name' 'college_id'
        report_submitted_message = 'Report Submitted by {0} ({1})'

    class cert_upload:
        success = 'Certificates Uploaded!!'
        file_not_found = 'No Zip File was Provided'
        invalid_file_type = 'Invalid zip file format'
        # if the zip is uploaded but the file names are incorrect or there is not registered students
        no_certificates_found = 'No Certificates to update'
        error = 'Upload Failed'
        report_approval_required = 'First Get the report Approved'

        # certified by 'first_name' 'college_id'
        certified_by = 'Certified by {0} ({1})'

    class apply_event:
        success = 'Event application successful'
        not_found = 'No Event Found!!'
        pending_event = 'The event is still pending for approval'
        completed_event = 'Event is already Completed'

    class delete_event:
        success = "'{0}' Deleted!"
        already_completed = 'This Event is already Completed it cannot be deleted'

    class delete_report:
        success = "Report Deleted!"
        already_approved = 'Event is already Approved cannot be deleted'

    class delete_cert:
        success = "Certificates Deleted!"
        no_cert_to_delete = 'No Certificate to delete'

    class approve_report:
        report_not_submitted = 'No report to approve'
        report_already_approved = 'Report already Approved'

        # in timeline Report Approved 'first_name' 'college_id'
        report_approved_message = 'Report Approved By {0} ({1})'

    class deny_report:
        report_not_submitted = 'No report was submitted for this event'

        # in timeline Report Rejected 'first_name' 'college_id'
        report_approved_message = 'Report Rejected By {0} ({1})'


class Validation:
    class event:
        title = 'Title Cannot be blank'
        non_organizer_forbidden = 'Access denied for event creation'
        report_file_limit = 'File too large. Size should not exceed {0} MiB.'
        register_participant_fcfs_true = 'Event enrolment successful!!'
        register_participant_fcfs_false = 'Event application successful!!'

        # is_eligible_to_apply
        # not open to HOD, DEAN (role)
        not_open_to_this_role = "Not open to {0}"
        strength_full = "Registration quota exceeded."

        not_open_to_organizer = "Not open to organisers."
        not_open_to_owner = 'Owner ineligible to apply.'
        email_required = "Update Email to apply."
        whatsapp_required = "Update WhatsApp to apply."

        class Timeline:
            # titles
            title_created = 'Event Created',
            title_hod = 'Approved by the Head of Department',
            title_dean = 'Approved by the Dean',
            title_vc = 'Approved by the Vice-Chancellor',
            title_display = 'Displayed to Students',
            title_ongoing = 'Event Ongoing',
            title_completed = 'Event Completed',
            title_report_uploaded = 'Report Submitted',
            title_report_approved = 'Report Approved',
            title_certified = 'Issued Certifications',

            failed_title_created = 'Event not Created',
            failed_title_hod = 'Rejected by the Head of Department',
            failed_title_dean = 'Rejected by the Dean',
            failed_title_vc = 'Rejected by the Vice-Chancellor',
            failed_title_display = 'Event not displayed to Students',
            failed_title_ongoing = 'Event not Ongoing',
            failed_title_completed = 'Event not Completed',
            failed_title_report_uploaded = 'Report not Submitted',
            failed_title_report_approved = 'Report not Approved',
            failed_title_certified = 'Certifications not Issued',
