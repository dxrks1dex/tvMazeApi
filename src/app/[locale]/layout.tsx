"use client";
import StyledComponentsRegistry from "./registry";
import "@/common/reset.css";
import styled from "styled-components";
import { SearchContextWrapper } from "@/hooks/context/useSearchContext";
import { ReactQueryProvider } from "@/hooks/fetch/ReactQueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/styleComponents/Header";

const LayoutStyle = styled.body`
  font-family:
    Roboto,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;

  //background: linear-gradient(to top right, #311D3F, #522546, #88304E, #E23E57);

  background-color: #0b1622;
`;
export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <LayoutStyle>
        <Header />
        <ReactQueryProvider>
          <SearchContextWrapper>
            <NextIntlClientProvider locale={locale}>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </NextIntlClientProvider>
          </SearchContextWrapper>
        </ReactQueryProvider>
      </LayoutStyle>
    </html>
  );
}
