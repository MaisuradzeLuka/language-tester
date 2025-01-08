import { auth } from "@/auth";
import AddQuestionForm from "@/components/forms/AddQuestionForm";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ locale?: string }> }) => {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");

  const locale = (await params).locale;

  if (session.role !== "ADMIN") redirect(locale + "/addQuestion/unauthorised");

  const t = await getTranslations("AddQuestion");

  return (
    <main className="milky-background">
      <div className="white-container">
        <h1 className="page-heading">{t("pageTitle")}</h1>

        <AddQuestionForm />
      </div>
    </main>
  );
};

export default Page;
