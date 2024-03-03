'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  gender: z.string().min(2).max(50),
  age: z.number(),
})

const OnboardingForm = ({ close }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: '',
    },
  })

  return (
    <>
      <Form {...form}>
        <form className='rounded-md bg-white px-6 py-4 shadow-md'>
          <div className='py-4 text-sm text-slate-600 '>
            {' '}
            Before proceeding please fill the below information :
          </div>
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select>
                    <SelectTrigger className='h-8 w-full border border-slate-300'>
                      <SelectValue placeholder='Gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='light'>Male</SelectItem>
                      <SelectItem value='dark'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='age'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select>
                    <SelectTrigger className='mt-4 h-8 w-full'>
                      <SelectValue placeholder='Age ' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='18-34'>18-34</SelectItem>
                      <SelectItem value='35-44'>35-44</SelectItem>
                      <SelectItem value='45-54'>45-54</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <div onClick={close} className='cursor-pointer'>
            {' '}
            Next
          </div>
        </form>
      </Form>
    </>
  )
}

export default OnboardingForm
