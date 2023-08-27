class Message:
    
    class detail:
        not_found = 'No Event Found!!!'
    
    class applicaition_approval:
        success = 'Application Updated!!'
    
    class event_approval:
        forbidden = 'Operation Not Allowed!!'
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

    class report_upload:
        success = 'Report Uploaded!!'
        error = 'Please Send a valid File!'
    
    class cert_upload:
        success = 'Certificates Uploaded!!'
        file_not_found = 'No Zip File was Provided'
        invalid_file_type = 'Invalid zip file format'
        no_certificates_found = 'No Certificates to update' # if the zip is uploaded but the file names are incorrect or there is not registered students
        errro = 'Upload Failed'
    
    class apply_event:
        success = 'Event application successfull'
        not_found = 'No Event Found!!'
    
    class delete_event:
        success = "'{0}' Deleted!"
    class delete_report:
        success = "Report Deleted!"
    class delete_cert:
        success = "Certificates Deleted!"

class Validation:
    class event:
        title = 'Title Cannot be blank'
        non_organizer_forbidden = 'Access denied for event creation'
        report_file_limit = 'File too large. Size should not exceed {0} MiB.'
        register_participant_fcfs_true = 'Event enrolment successful!!' 
        register_participant_fcfs_false = 'Event application successful!!' 
        

        # is_eligible_to_apply
        not_open_to_this_role = "Not open to {0}" # not open to HOD, DEAN (role)
        strength_full = "Registration quota exceeded."

        not_open_to_organizer = "Not open to organisers."
        not_open_to_owner = 'Owner ineligible to apply.'
        email_required = "Update Email to apply."
        whatsapp_required = "Update WhatsApp to apply."

        class Timeline:
            #titles
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