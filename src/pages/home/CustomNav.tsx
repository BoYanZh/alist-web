import {
  Box,
  useColorModeValue,
  Text,
  Avatar,
  VStack,
  Grid,
  GridItem,
} from "@hope-ui/solid"
import { Motion } from "@motionone/solid"
import { For } from "solid-js"
import { getSetting } from "~/store"
import { hoverColor } from "~/utils"
interface CustomNavItem {
  name: string
  url: string
  icon: string
}

export const CustomNav = () => {
  const cardBg = useColorModeValue("white", "$neutral3")
  const navs: CustomNavItem[] = JSON.parse(getSetting("customize_nav"))
  return (
    <Box w="$full" rounded="$xl" bgColor={cardBg()} p="$4" shadow="$lg">
      <Grid
        templateColumns="repeat(auto-fit, $16)"
        justifyContent={"center"}
        gap="$6"
      >
        <For each={navs}>
          {(item) => (
            <GridItem>
              <a href={item.url}>
                <Motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <VStack
                    transition="all 0.3s"
                    _hover={{
                      transform: "scale(1.01)",
                      bgColor: hoverColor(),
                    }}
                    rounded="$lg"
                    wrap="wrap"
                    spacing="$4"
                    p="$2"
                  >
                    <Avatar name="Hector Rhodes" src={item.icon} />
                    <Text
                      css={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      maxWidth={48}
                    >
                      {item.name}
                    </Text>
                  </VStack>
                </Motion.div>
              </a>
            </GridItem>
          )}
        </For>
      </Grid>
    </Box>
  )
}
