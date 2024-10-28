const getApplyJobEmailTemplate = (userName, jobTitle, companyName,logo) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Application Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <!-- Wrapper Table -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Email Container -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td align="center" bgcolor="#2563eb" style="padding: 40px 20px;">
                            <img src=${logo} alt="Company Logo" width="150" style="display: block; margin-bottom: 20px;" />
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: bold;">Application Confirmation</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <!-- Greeting -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #333333; font-size: 16px; padding-bottom: 20px;">
                                        Dear ${userName},
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #333333; font-size: 16px; padding-bottom: 20px; line-height: 24px;">
                                        We are pleased to inform you that your application for the position of <span style="color: #2563eb; font-weight: bold;">"${jobTitle}"</span> has been successfully received.
                                    </td>
                                </tr>
                                
                                <!-- Notice Box -->
                                <tr>
                                    <td style="padding: 20px; background-color: #f8fafc; border-left: 4px solid #2563eb; margin: 20px 0;">
                                        <p style="color: #4b5563; margin: 0; font-size: 16px; line-height: 24px;">
                                            Our team will carefully review your application and qualifications. If your profile matches our requirements, we will contact you regarding the next steps in the selection process.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Next Steps -->
                                <tr>
                                    <td style="padding-top: 30px;">
                                        <p style="color: #333333; font-size: 16px; margin: 0 0 15px 0;">What happens next?</p>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="padding: 0 0 10px 20px; color: #333333;">• Our hiring team will review your application</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 10px 20px; color: #333333;">• You may be contacted for additional information if needed</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 10px 20px; color: #333333;">• Selected candidates will be invited for interviews</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Thank You Note -->
                                <tr>
                                    <td style="padding-top: 30px; color: #333333; font-size: 16px; line-height: 24px;">
                                        Thank you for choosing our platform to explore exciting career opportunities. We appreciate your interest in joining our team.
                                    </td>
                                </tr>
                                
                                <!-- Signature -->
                                <tr>
                                    <td style="padding-top: 30px;">
                                        <p style="color: #333333; margin: 0 0 5px 0;">Best regards,</p>
                                        <p style="color: #333333; font-weight: bold; margin: 0;">${companyName} Team</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
                            <p style="margin: 0; color: #64748b; font-size: 14px;">This is an automated email. Please do not reply to this message.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export default getApplyJobEmailTemplate