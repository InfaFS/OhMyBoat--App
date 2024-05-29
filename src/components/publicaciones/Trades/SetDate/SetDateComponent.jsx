"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TradeDateSchema } from "@/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setTradeDate } from "../../../../../actions/tradeActions";
import { toast } from "sonner";
export function SetDateComponent({alreadySetted,userId,tradeId}) {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(TradeDateSchema),
        defaultValues: {
            selectDate: "",
        }
    });

    const onSubmit = async (data) => { //async poner
        console.log(data.selectDate);
        console.log(userId)
        console.log(tradeId)
        const res = await setTradeDate({userId,tradeId,proposedDay:data.selectDate});
        if (res.success) {
            toast.success(res.success);
            router.refresh();
            router.back();

        }
        console.log(res);
    }
    console.log(userId)
    console.log(tradeId)
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
                <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Pactar fecha</CardTitle>
                        <span className="block text-center text-slate-400 text-sm mt-2">Selecciona una fecha acordada para realizar el trueque</span>
                    </CardHeader>

                    { alreadySetted === false && (
                        <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* DATE */}
                                <FormField
                                    control={form.control}
                                    name="selectDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center">
                                            <FormLabel className="hover:text-slate-500">Fecha:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="date"
                                                    className="mt-1 block w-1/2"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-center">
                                    <Button variant="ghost" className="bg-sky-500 text-white hover:bg-sky-600">
                                        Confirmar
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    )}
                    {alreadySetted === true && (
                        <CardContent>
                            <div className="flex justify-center">
                                <span className="text-slate-500">Ya has pactado una fecha para este trueque</span>
                            </div>
                        </CardContent>
                    
                    )}

                </Card>
            </div>
        </div>
    );
}
