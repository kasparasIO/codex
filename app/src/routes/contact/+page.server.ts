import { SECRET_FORM_RECEIVER_ADDRESS, SECRET_WORKSPACE_ADDRESS, SECRET_WORKSPACE_PASSWORD } from '$env/static/private';
import nodemailer from 'nodemailer';
import z from "zod";
interface FormObject {
    name: string,
    email: string, 
    message: string
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: SECRET_WORKSPACE_ADDRESS,
        pass: SECRET_WORKSPACE_PASSWORD,
    }
});
const sendMail = async (data: FormObject) => {
     await transporter.sendMail({
        from: `'NEW MESSAGE' <${SECRET_WORKSPACE_ADDRESS}>`,
        to: `${SECRET_FORM_RECEIVER_ADDRESS}`,
        subject: `New message from ${data?.name}`,
        text: `Name: ${data?.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
        html: `
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
        <p>Name: ${data.name}</p><p>Email: ${data.email}</p><p>Message: ${data.message}</p>
        </div>
       `
    });
}
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    message: z.string().min(2, "Message lenght, has to be provided and at least 2 characters long.")
})


export const actions = {
    default: async ({request}) => {
       try { 
        const formData = await request.formData();
        const formObj = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        }
        formSchema.parse(formObj);
        await sendMail((formObj as FormObject))
        return {
            success: true
        }   
    } catch (e) {
        if (e instanceof z.ZodError) {
            return {
                validationError: e.issues
            }
        } 
        else {
            return {
                error: (e as Error).message
                }
            }
        }
    }
}