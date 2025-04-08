"use client";

import { roleApi } from "@/apis";
import { Form, IFormRef } from "@/components/ui/form";
import { TextField } from "@/components/ui/form/text-field";
import { IGeneral } from "@/interfaces/general";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Flex, Grid, Switch, Table, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";

const FormSchema = yup.object({
  name: yup.string().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
});

type IFormData = {
  _id?: string;
  name?: string;
  description?: string;
  permissions: {
    [code: string]: {
      code: string;
      isFull: boolean;
      isRead: boolean;
      isWrite: boolean;
      isRemove: boolean;
      isExport: boolean;
    };
  };
};

type Props = {
  profile?: boolean;
  payload: IFormData;
  formRef: React.Ref<IFormRef>;
  onLoadingStatus?: (loading: boolean) => void;
};

export default function RoleForm({
  payload,
  formRef,
  onLoadingStatus,
  profile,
}: Props) {
  const { id } = useParams();
  const router = useRouter();
  const { permissionGroups, permissions } = useSelector(
    (state: { general: IGeneral }) => state.general,
  );
  const [permission, setPermission] = useState<{
    [code: string]: {
      code: string;
      isFull: boolean;
      isRead: boolean;
      isWrite: boolean;
      isRemove: boolean;
      isExport: boolean;
    };
  }>(payload.permissions);

  const [data] = useState({
    name: undefined,
    description: undefined,
    ...payload,
  });

  const onChange = (checked: boolean, access: string, code: string) => {
    const perm = permission[code];
    switch (access) {
      case "read": {
        perm.isRead = checked;
        break;
      }
      case "write": {
        perm.isWrite = checked;
        break;
      }
      case "remove": {
        perm.isRemove = checked;
        break;
      }
      case "export": {
        perm.isExport = checked;
        break;
      }
      default: {
        perm.isFull = checked;
        perm.isRead = checked;
        perm.isWrite = checked;
        perm.isRemove = checked;
        perm.isExport = checked;
      }
    }

    if (perm.isRead && perm.isWrite && perm.isRemove && perm.isExport) {
      perm.isFull = true;
    } else {
      perm.isFull = false;
    }

    setPermission({
      ...permission,
      [code]: perm,
    });
  };

  const onSubmit = async (values: IFormData) => {
    try {
      onLoadingStatus && onLoadingStatus(true);

      if (id) {
        await roleApi.update(id as string, {
          name: values.name,
          description: values.description,
          permissions: Object.values(permission),
        });
      } else {
        await roleApi.create({
          name: values.name,
          description: values.description,
          permissions: Object.values(permission),
        });
      }

      message.success("Таны хүсэлт амжилттай!");
      router.push("/role");
    } catch (err) {
      message.error((err as HttpHandler)?.message!);
    } finally {
      onLoadingStatus && onLoadingStatus(false);
    }
  };

  return (
    <Form
      ref={formRef}
      initialValues={data}
      validationSchema={FormSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Grid>
          <Grid.Col span={4}>
            <Flex gap={10} direction="column">
              <TextField name="name" placeholder="Нэр" label="Нэр" />
            </Flex>
          </Grid.Col>
          <Grid.Col span={4}>
            <Flex gap={10} direction="column">
              <TextField
                name="description"
                placeholder="Тайлбар"
                label="Тайлбар"
              />
            </Flex>
          </Grid.Col>
          {permissionGroups.map((group, index) => {
            const perms = (permissions || [])
              .filter((p) => p.group === group.code)
              .map((perm) => perm);
            // .map((perm) => {
            // const { isFull, isRead, isWrite, isRemove, isExport } =
            // accesses?.find((acc) => acc.code === perm.code) || {
            //       isFull: false,
            //       isRead: false,
            //       isWrite: false,
            //       isRemove: false,
            //       isExport: false,
            //     };

            //   return {
            //     name: perm.name,
            //     code: perm.code,
            //     description: perm.description,
            //     isFull: isFull ? "on" : "off",
            //     isRead: isRead ? "on" : "off",
            //     isWrite: isWrite ? "on" : "off",
            //     isRemove: isRemove ? "on" : "off",
            //     isExport: isExport ? "on" : "off",
            //   };
            // });

            return (
              <Grid.Col span={12} key={index}>
                <Text size="lg" fw={600} my="lg">
                  {group.name}
                </Text>
                <Table.ScrollContainer minWidth={500}>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th style={{ width: "200px" }}>Үйлдэл</Table.Th>
                        <Table.Th style={{ width: "400px" }}>Тайлбар</Table.Th>
                        <Table.Th style={{ width: "100px" }}>Бүх эрх</Table.Th>
                        <Table.Th style={{ width: "100px" }}>Харах</Table.Th>
                        <Table.Th style={{ width: "100px" }}>Үүсгэх</Table.Th>
                        <Table.Th style={{ width: "100px" }}>Цуцлах</Table.Th>
                        <Table.Th style={{ width: "100px" }}>Хэвлэх</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {perms.map((perm, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>{perm.name}</Table.Td>
                          <Table.Td>{perm.description}</Table.Td>
                          <Table.Td>
                            {perm.isFull === "on" ? (
                              <Switch
                                checked={permission[perm.code]?.isFull}
                                onChange={(e) =>
                                  profile
                                    ? console.log("profile")
                                    : onChange(
                                        e.target.checked,
                                        "full",
                                        perm.code,
                                      )
                                }
                              />
                            ) : (
                              "-"
                            )}
                          </Table.Td>
                          <Table.Td>
                            {perm.isRead === "on" ? (
                              <Switch
                                checked={permission[perm.code]?.isRead}
                                onChange={(e) =>
                                  profile
                                    ? console.log("profile")
                                    : onChange(
                                        e.target.checked,
                                        "read",
                                        perm.code,
                                      )
                                }
                              />
                            ) : (
                              "-"
                            )}
                          </Table.Td>
                          <Table.Td>
                            {perm.isWrite === "on" ? (
                              <Switch
                                checked={permission[perm.code]?.isWrite}
                                onChange={(e) =>
                                  profile
                                    ? console.log("profile")
                                    : onChange(
                                        e.target.checked,
                                        "write",
                                        perm.code,
                                      )
                                }
                              />
                            ) : (
                              "-"
                            )}
                          </Table.Td>
                          <Table.Td>
                            {perm.isRemove === "on" ? (
                              <Switch
                                checked={permission[perm.code]?.isRemove}
                                onChange={(e) =>
                                  onChange(
                                    e.target.checked,
                                    "remove",
                                    perm.code,
                                  )
                                }
                              />
                            ) : (
                              "-"
                            )}
                          </Table.Td>
                          <Table.Td>
                            {perm.isExport === "on" ? (
                              <Switch
                                checked={permission[perm.code]?.isExport}
                                onChange={(e) =>
                                  onChange(
                                    e.target.checked,
                                    "export",
                                    perm.code,
                                  )
                                }
                              />
                            ) : (
                              "-"
                            )}
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </Form>
  );
}
