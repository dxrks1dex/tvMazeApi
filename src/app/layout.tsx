'use client'
import StyledComponentsRegistry from './registry'
import '@/common/reset.css';
import styled from "styled-components";
import {SearchContextWrapper} from "@/hooks/searchContext";
import {ReactQueryProvider} from "@/hooks/fetch/ReactQueryProvider";

const LayoutStyle = styled.body`

  font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  background: linear-gradient(to top right, #311D3F, #522546, #88304E, #E23E57);

`
export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    // const [queryClient] = useState(() => new QueryClient());

    return (
        <html>
        <LayoutStyle>
            <ReactQueryProvider>
                <SearchContextWrapper>
                    <StyledComponentsRegistry>
                        {children}
                    </StyledComponentsRegistry>
                </SearchContextWrapper>
            </ReactQueryProvider>
        </LayoutStyle>
        </html>
    )
}
